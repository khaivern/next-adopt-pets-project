import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { fetchSingleAnimal } from "../../util/connect-to-pet-client";
import LoadingSpinner from "../../components/ui/LoadingSpinner/loading-spinner";
import Card from "../../components/ui/Card/card";
import PetHeader from "../../components/pets/PetDetails/pet-header";
import PetContent from "../../components/pets/PetDetails/pet-content";
import useNotification from "../../hooks/use-notification";

import classes from "./pet-detail.module.css";

const PetDetailPage = () => {
  const { sendPetData } = useNotification();

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
    const name = loadedPet.name.split(" ")[0];
    const petData = {
      id: loadedPet.id,
      image: loadedPet.photos[0].large,
      name: name,
      type: loadedPet.type,
      species: loadedPet.species,
      adoptionSite: loadedPet.url,
      gender: loadedPet.gender,
      age: loadedPet.age,
    };

    const status = sendPetData(petData);
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
