import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUS}.h2i3t.mongodb.net/${process.env.MONGO_NAME}`
    );
    return client;
  } catch (err) {
    return {
      error: err.message,
    };
  }
};

export const fetchCollection = async () => {
  try {
    const client = await connectToDatabase();
    const usersCollection = await client.db().collection("users");
    return usersCollection;
  } catch (err) {
    return {
      error: err.message,
    };
  }
};
