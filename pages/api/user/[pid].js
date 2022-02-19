import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
import { fetchCollection } from "../../../util/connect-to-database";

async function handler(req, res) {
  if (req.method !== "DELETE")
    return res.status(401).json({ message: "Unauthorized method" });

  const session = await getSession({ req: req });
  if (!session) {
    return res.status(401).json({
      message: "UnAuthorized Access",
    });
  }
  const pId = req.query.pid;

  let usersCollection;
  try {
    usersCollection = await fetchCollection();
    if (usersCollection.err) throw new Error(usersCollection.err);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to connect to users collection" });
  }
  let user;
  const userId = new ObjectId(session.user._id);
  const userEmail = session.user.email;
  try {
    user = await usersCollection.findOne({
      _id: userId,
      email: userEmail,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Failure to find user" });
  }
  const updatedFavPetList = user.favouritePets.filter(
    (pet) => pet.id.toString() !== pId
  );
  try {
    const result = await usersCollection.updateOne(
      { _id: userId, email: userEmail },
      { $set: { favouritePets: updatedFavPetList } }
    );
    return res
      .status(200)
      .json({ message: "Pet removed from list", petId: pId });
  } catch (err) {
    return res.status(500).json({ message: "Failed to remove pet" });
  }
}

export default handler;
