import { useEffect, useState } from "react";

import useAuth from "../hooks/use-auth";
import PetList from "../components/pets/pet-list";
import classes from "../styles/Home.module.css";
import { getSession, useSession } from "next-auth/react";
import connectToPetClient from "../util/connect-to-pet-client";
import LoadingSpinner from "../components/ui/LoadingSpinner/loading-spinner";

export default function HomePage({ pets }) {
  useAuth();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPets, setLoadedPets] = useState([]);

  const [page, setPage] = useState(1);
  useEffect(() => {
    if (pets && pets.length !== 0) {
      setIsLoading(false);
      return setLoadedPets(pets);
    }
    const fetchAnimals = async () => {
      if (session && session.user && session.user.accessToken) {
        const client = connectToPetClient(session.user.accessToken);
        try {
          const petResults = await client.animal.search({ limit: 12 });
          setLoadedPets(petResults.data.animals);
        } catch (err) {
          console.log(err);
        }
      } else {
        const client = connectToPetClient();
        try {
          const petResults = await client.animal.search({
            limit: 12,
          });
          setLoadedPets(petResults.data.animals);
        } catch (err) {
          console.log(err);
        }
      }
      setIsLoading(false);
    };
    fetchAnimals();
  }, [pets, session]);

  return (
    <section className={classes.section}>
      <h1>Browse all</h1>
      {isLoading && <LoadingSpinner />}
      {!isLoading && <PetList pets={loadedPets} />}
    </section>
  );
}

export async function getStaticProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    const client = connectToPetClient();
    try {
      const petResults = await client.animal.search({
        limit: 12,
      });

      return {
        props: {
          pets: petResults.data.animals,
        },
        revalidate: 3600,
      };
    } catch (err) {
      return {
        props: {
          pets: [],
        },
      };
    }
  } else {
    const client = connectToPetClient(session.user.accessToken);
    try {
      const petResults = await client.animal.search({ limit: 12 });
      return {
        props: {
          pets: petResults.data.animals,
        },
        revalidate: 3600,
      };
    } catch (err) {
      return {
        props: {
          pets: [],
        },
      };
    }
  }
}
