import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

import useAuth from "../hooks/use-auth";
import connectToPetClient, {
  fetchValidatedData,
} from "../util/connect-to-pet-client";
import PetList from "../components/pets/pet-list";
import LoadingSpinner from "../components/ui/LoadingSpinner/loading-spinner";
import classes from "../styles/Home.module.css";
import Button from "../components/ui/Button/button";

export default function HomePage({ pets }) {
  useAuth();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPets, setLoadedPets] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("Fetching Pets...");
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const { cleanPetData, page } = await fetchValidatedData(session, pets);
      setPage(page);
      setLoadedPets(cleanPetData);
      setLoadingStatus("Fetched Completed");
      setIsLoading(false);
    };
    fetchData();
  }, [pets, session, page]);

  const loadNextPageHandler = () => {};

  return (
    <section className={classes.section}>
      <h1>Browse all</h1>
      {isLoading && <LoadingSpinner loadingText={loadingStatus} />}
      {!isLoading && <PetList pets={loadedPets} />}
      <Button
        className={classes["next--page__button"]}
        onClick={loadNextPageHandler}
        inverse
      >
        Load Next Page
      </Button>
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
