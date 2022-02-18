import { ObjectId } from "mongodb";
import React from "react";
import FavouriteList from "../../components/user/FavouriteList/favourite-list";
import { fetchCollection } from "../../util/connect-to-database";

const DUMMY_PETS = [
  {
    name: "Saff",
    image:
      "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/54665242/1/?bust=1645163974&width=600",
    type: "Cat",
    species: "Cat",
    adoptionSite:
      "https://www.petfinder.com/cat/saffron-together-with-brother-cashew-54665242/il/glenview/lucky-whiskers-rescue-il982/?referrer_id=22646517-e055-4538-b052-f0f9891bce61",
    gender: "Female",
    age: "Baby",
  },
];

const UserPage = ({ pets }) => {
  return (
    <section style={{ marginTop: "2rem" }}>
      <FavouriteList pets={pets || DUMMY_PETS} />
    </section>
  );
};

export default UserPage;

export async function getStaticProps(context) {
  const { uid } = context.params;
  const usersCollection = await fetchCollection();
  let user;
  const userId = new ObjectId(uid);
  try {
    user = await usersCollection.findOne({ _id: userId });
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return {
      props: {
        pets: [],
      },
      revalidate: 3600,
    };
  }
  return {
    props: {
      pets: user.favouritePets,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: "blocking",
  };
}
