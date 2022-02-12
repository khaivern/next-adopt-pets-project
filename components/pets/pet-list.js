import React from "react";
import PetItem from "./pet-item";

import classes from "./pet-list.module.css";

const PetList = ({ pets }) => {
  if (pets.length === 0) {
    return (
      <div className='center'>
        <h2>No Pets found!</h2>
        <p>Try again later</p>
      </div>
    );
  }
  return (
    <ul className={classes.grid}>
      {pets.map((pet) => {
        <PetItem />;
      })}
    </ul>
  );
};

export default PetList;
