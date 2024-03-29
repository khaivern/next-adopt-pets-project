const petfinder = require("@petfinder/petfinder-js");

// Helper functions

async function getAnimal(id, client) {
  try {
    const resp = await client.animal.show(id);
    return resp.data.animal;
  } catch (err) {
    return { error: err.message };
  }
}

async function getAnimals(page, limit, client) {
  try {
    const petResults = await client.animal.search({ limit: limit, page: page });
    return petResults.data.animals;
  } catch (err) {
    return { error: err.message };
  }
}

export function validatePetData(pet) {
  const descriptionIsValid = !!pet.description;
  const photosIsValid = !!pet.photos[0];
  const nameIsValid = pet.name.replace(/[^a-zA-Z]/g, "").length !== 0;
  const tagsAtLeastOne = pet.tags.length > 0;
  const overallIsValid =
    descriptionIsValid && photosIsValid && nameIsValid && tagsAtLeastOne;
  return overallIsValid;
}

// End of helper

// Start of http search functions

const connectToPetClient = (accessToken = null) => {
  const client = new petfinder.Client({
    apiKey: process.env.PETFINDER_API_KEY,
    secret: process.env.PETFINDER_SECRET,
    token: accessToken,
  });
  return client;
};

export const fetchSingleAnimal = async (session, id) => {
  if (session && session.user && session.user.accessToken) {
    const client = connectToPetClient(session.user.accessToken);
    return await getAnimal(id, client);
  } else {
    const client = connectToPetClient();
    return await getAnimal(id, client);
  }
};

export const fetchAnimals = async (session, page = 1) => {
  if (session && session.user && session.user.accessToken) {
    const client = connectToPetClient(session.user.accessToken);
    return await getAnimals(page, 100, client);
  } else {
    const client = connectToPetClient();
    return await getAnimals(page, 100, client);
  }
};

export const fetchValidatedData = async (
  session,
  incomplete = [],
  currPage = 1
) => {
  const cleanPetData = incomplete;
  let page = currPage;
  while (cleanPetData.length < 12) {
    const petResults = await fetchAnimals(session, page);

    if (petResults.error) return { cleanPetData: incomplete, page };

    for (let pet of petResults) {
      if (cleanPetData.length >= 12) break;
      if (validatePetData(pet)) {
        cleanPetData.push(pet);
      }
    }
    page++;
  }

  return { cleanPetData, page };
};

// end of http fetch functions

export default connectToPetClient;
