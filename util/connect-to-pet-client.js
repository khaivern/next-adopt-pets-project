const petfinder = require("@petfinder/petfinder-js");

const connectToPetClient = (accessToken = null) => {
  const client = new petfinder.Client({
    apiKey: process.env.PETFINDER_API_KEY,
    secret: process.env.PETFINDER_SECRET,
    token: accessToken,
  });
  return client;
};

export default connectToPetClient;
