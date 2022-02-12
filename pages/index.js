import { useState } from "react";
import PetList from "../components/pets/pet-list";
import classes from "../styles/Home.module.css";

export default function Home() {
  const [pets, setPets] = useState([]);
  return (
    <section className={classes.section}>
      <h1>Browse all</h1>
      <PetList pets={pets} />
    </section>
  );
}
