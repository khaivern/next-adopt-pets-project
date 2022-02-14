const petfinder = require("@petfinder/petfinder-js");

const connectToPetClient = () => {
  const client = new petfinder.Client({
    apiKey: process.env.PETFINDER_API_KEY,
    secret: process.env.PETFINDER_SECRET,
  });
  return client;
};

export default connectToPetClient;
