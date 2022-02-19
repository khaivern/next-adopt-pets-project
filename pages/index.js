import { useCallback, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

import useAuth from "../hooks/use-auth";
import connectToPetClient, {
  fetchValidatedData,
  validatePetData,
} from "../util/connect-to-pet-client";
import PetList from "../components/pets/pet-list";
import LoadingSpinner from "../components/ui/LoadingSpinner/loading-spinner";
import classes from "../styles/Home.module.css";
import Button from "../components/ui/Button/button";
import useNotification from "../hooks/use-notification";
import Notification from "../components/ui/Notification/notification";

export default function HomePage({ pets }) {
  useAuth();
  const {
    title,
    message,
    status: notiStatus,
    clearNotification,
  } = useNotification();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPets, setLoadedPets] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("Fetching Latest Pets...");
  const [page, setPage] = useState(2);
  const fetchData = useCallback(
    async (page, incompletePetArr) => {
      setLoadingStatus("Pets are being cleaned");
      const { cleanPetData, page: currPage } = await fetchValidatedData(
        session,
        incompletePetArr,
        page
      );
      setPage(currPage);
      return cleanPetData;
    },
    [session]
  );

  useEffect(() => {
    const cleanDataFromStaticProps = [];
    if (pets && pets.length === 100) {
      for (let pet of pets) {
        if (cleanDataFromStaticProps.length >= 12) {
          setLoadedPets(cleanDataFromStaticProps);
          setIsLoading(false);
          break;
        }
        if (validatePetData(pet)) {
          cleanDataFromStaticProps.push(pet);
        }
      }
    }
    fetchData(page, cleanDataFromStaticProps)
      .then((pets) => {
        return setLoadedPets(pets);
      })
      .then((res) => setIsLoading(false));
  }, [pets, fetchData]); // adding page var would cause infinite calls

  const loadNextPageHandler = () => {
    setLoadingStatus("Sanitizing new data...");
    setIsLoading(true);
    fetchData(page)
      .then((pets) => {
        return setLoadedPets(pets);
      })
      .then((res) => setIsLoading(false))
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <section className={classes.section}>
      {title && message && notiStatus && (
        <Notification
          title={title}
          message={message}
          status={notiStatus}
          onClick={clearNotification}
        />
      )}
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
        limit: 100,
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
      const petResults = await client.animal.search({ limit: 100 });
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
