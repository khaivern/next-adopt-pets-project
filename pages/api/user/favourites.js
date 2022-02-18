import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
import { fetchCollection } from "../../../util/connect-to-database";
const validateInputs = (petData) => {
  const nameIsValid = petData.name && petData.name.replace(/[^\w]/g, "") !== "";
  return (
    nameIsValid &&
    !!petData.image &&
    !!petData.type &&
    !!petData.species &&
    !!petData.adoptionSite &&
    petData.gender &&
    petData.age
  );
};

async function handler(req, res) {
  const session = await getSession({ req: req });

  if (!session) {
    return res.status(401).json({
      message: "Not Authenticated",
    });
  }

  const userId = new ObjectId(session.user._id);
  const userEmail = session.user.email;
  if (req.method !== "POST") {
    return res.status(403).json({
      message: "Forbidden method",
    });
  }

  const { image, name, type, species, adoptionSite, gender, age } = req.body;
  const pet2 = req.body;
  let usersCollection;
  try {
    usersCollection = await fetchCollection();
    if (usersCollection.error) {
      throw new Error(usersCollection.error || "Something went wrong");
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to connect to users collection" });
  }

  let user;
  try {
    user = await usersCollection.findOne({ _id: userId, email: userEmail });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to access collection to find one user" });
  }

  if (!user) {
    return res.status(404).json({
      message: "this user is not in our records",
    });
  }

  const newFavouritePet = {
    name,
    image,
    type,
    species,
    adoptionSite,
    gender,
    age,
  };
  const isValid = validateInputs(newFavouritePet);

  if (!isValid) {
    return res.status(422).json({
      message:
        "Inputs not validated, pet has missing data to be placed in favourites page",
    });
  }

  const updatedFavPetList = [newFavouritePet, ...user.favouritePets];

  const result = await usersCollection.updateOne(
    { _id: userId, email: userEmail },
    { $set: { favouritePets: updatedFavPetList } }
  );

  return res.status(201).json({
    message: "Favourite list has been updated",
    result: result[0],
  });
}

export default handler;
