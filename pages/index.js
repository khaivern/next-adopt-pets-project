import axios from "axios";
import { useEffect, useState } from "react";

import PetList from "../components/pets/pet-list";
import classes from "../styles/Home.module.css";

export default function HomePage() {
  const [loadedPets, setLoadedPets] = useState([]);

  useEffect(() => {
    axios
      .get("/api/pets")
      .then((resp) => {
        setLoadedPets(resp.data.pets);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className={classes.section}>
      <h1>Browse all</h1>
      <PetList pets={loadedPets} />
    </section>
  );
}
