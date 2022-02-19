import React, { Fragment } from "react";
import PetItem from "./pet-item";
import { v4 as uuid } from "uuid";
import classes from "./pet-list.module.css";
import Card from "../ui/Card/card";

const PetList = ({ pets }) => {
  if (pets && pets.length === 0) {
    return (
      <Card>
        <div className='center'>
          <h2>
            No pets found or API quota is finished, please try again tomorrow.
          </h2>
        </div>
      </Card>
    );
  }
  if (pets && pets.length > 12) {
    pets.pop();
  }

  return (
    <Fragment>
      <ul className={classes.grid}>
        {pets.map((pet) => {
          return <PetItem key={`${pet.id}-${uuid()}`} pet={pet} />;
        })}
      </ul>
    </Fragment>
  );
};

export default PetList;
