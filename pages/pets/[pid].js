import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { fetchSingleAnimal } from "../../util/connect-to-pet-client";
import LoadingSpinner from "../../components/ui/LoadingSpinner/loading-spinner";
import Card from "../../components/ui/Card/card";
import PetHeader from "../../components/pets/PetDetails/pet-header";
import PetContent from "../../components/pets/PetDetails/pet-content";

import classes from "./pet-detail.module.css";
import { sendPetData } from "../../components/pets/pet-item";
import { useDispatch } from "react-redux";
import { notiActions } from "../../store/notification-slice";

const PetDetailPage = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { pid } = useRouter().query;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPet, setLoadedPet] = useState();
  useEffect(() => {
    const fetchAnimal = async () => {
      if (!pid) return;
      const pet = await fetchSingleAnimal(session, pid); // return error to display
      if (pet.error) {
        return;
      }
      return pet;
    };
    fetchAnimal()
      .then((pet) => {
        return setLoadedPet(pet);
      })
      .then((res) => setIsLoading(false));
  }, [pid, session]);

  const favButtonHandler = () => {
    dispatch(
      notiActions.createNotification({
        title: "Sending",
        message: "this pet data is being sent to your favourite's list",
        status: "pending",
      })
    );
    const name = loadedPet.name.split(" ")[0];
    const petData = {
      image: loadedPet.photos[0].large,
      name: name,
      type: loadedPet.type,
      species: loadedPet.species,
      adoptionSite: loadedPet.url,
      gender: loadedPet.gender,
      age: loadedPet.age,
    };

    const { status, data } = sendPetData(petData);
    if (status !== 201) {
      dispatch(
        notiActions.createNotification({
          title: "Not Good 😥",
          message:
            "the pet managed to escape our grip sadly... please try again later",
          status: "error",
        })
      );
    } else {
      dispatch(
        notiActions.createNotification({
          title: "Success ✔",
          message: "The pet data is now stored safely",
          status: "success",
        })
      );
    }
  };

  if (!loadedPet || isLoading || loading) {
    return <LoadingSpinner loadingText='fetching that little one 👀' />;
  }

  return (
    <Card className={classes.card}>
      <PetHeader pet={loadedPet} />
      <PetContent
        description={loadedPet.description}
        date={loadedPet.published_at}
        status={loadedPet.status}
        onFavButtonClick={favButtonHandler}
      />
    </Card>
  );
};

export default PetDetailPage;

// export async function getStaticProps(context) {
//   const { pid } = context.params;
// }
