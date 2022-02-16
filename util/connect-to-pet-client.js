const petfinder = require("@petfinder/petfinder-js");

const connectToPetClient = (accessToken = null) => {
  const client = new petfinder.Client({
    apiKey: process.env.PETFINDER_API_KEY,
    secret: process.env.PETFINDER_SECRET,
    token: accessToken,
  });
  return client;
};

export const fetchAnimals = async (session, page = 1) => {
  if (session && session.user && session.user.accessToken) {
    const client = connectToPetClient(session.user.accessToken);
    try {
      const petResults = await client.animal.search({ limit: 12, page: page });
      return petResults.data.animals;
    } catch (err) {
      console.log(err);
    }
  } else {
    const client = connectToPetClient();
    try {
      const petResults = await client.animal.search({
        limit: 12,
        page: page,
      });
      return petResults.data.animals;
    } catch (err) {
      console.log(err);
    }
  }
};

export const fetchValidatedData = async (session, unsanitizedData = []) => {
  const cleanPetData = [];
  let page = 1;
  while (cleanPetData.length < 12) {
    const petResults = await fetchAnimals(session, page);
    if (!petResults) {
      cleanPetData = unsanitizedData;
      return { cleanPetData, page };
    }
    for (let pet of petResults) {
      let validName = pet.name.replace(/[^a-zA-Z]/g, "").length !== 0;
      if (
        pet.description &&
        pet.photos[0] &&
        validName &&
        cleanPetData.length < 12
      ) {
        cleanPetData.push(pet);
      }
    }
    page++;
  }

  return { cleanPetData, page };
};

export default connectToPetClient;
