import { ObjectId } from "mongodb";
import React, { useState } from "react";
import FavouriteList from "../../components/user/FavouriteList/favourite-list";
import { fetchCollection } from "../../util/connect-to-database";

const UserPage = ({ pets }) => {
  const [loadedPets, setLoadedPets] = useState(pets);
  const removePetHandler = (petId) => {
    setLoadedPets((curr) => curr.filter((pet) => pet.id !== petId));
  };

  return (
    <section style={{ marginTop: "2rem" }}>
      <FavouriteList pets={loadedPets} onRemovePet={removePetHandler} />
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
