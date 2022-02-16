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

export const validatePetData = (pets) => {
  console.log("validate func");
  let error = 0;
  for (let pet of pets) {
    console.log("num of errors", error);
    if (error >= 4) {
      return false;
    }
    let validName = pet.name.replace(/[^a-zA-Z]/g, "").length !== 0;
    if (!pet.description || !pet.photos[0] || !validName) {
      error++;
    }
  }
  return true;
};

export default connectToPetClient;
