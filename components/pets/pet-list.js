import React, { Fragment } from "react";
import PetItem from "./pet-item";

import classes from "./pet-list.module.css";

const PetList = ({ pets }) => {
  if (pets && pets.length === 0) {
    return (
      <div className='center'>
        <h2>No Pets found!</h2>
        <p>Try again later</p>
      </div>
    );
  }

  return (
    <Fragment>
      <ul className={classes.grid}>
        {pets.map((pet) => {
          return <PetItem key={pet.id} pet={pet} />;
        })}
      </ul>
    </Fragment>
  );
};

export default PetList;
