import React from "react";
import Button from "../../ui/Button/button";
import Card from "../../ui/Card/card";

import classes from "./favourite-item.module.css";

const FavouriteItem = ({ pet }) => {
  const removeFavItemHandler = () => {};

  return (
    <Card className={classes.main__card}>
      <li className={classes.item}>
        <div className={classes.name}>
          <h2>{pet.name}</h2>
        </div>
        <div className={classes.wrapper}>
          <img src={pet.image} alt={pet.name} width={500} height={400} />
        </div>

        <Card className={classes.content}>
          <h3>Animal Stats</h3>
          <h3>Type : {pet.type}</h3>
          <h3>Species : {pet.species}</h3>
          <h3>Age : {pet.age}</h3>
          <h3>Gender : {pet.gender}</h3>
        </Card>

        <Card className={classes.actions}>
          <h3>Actions</h3>
          <Button href={pet.adoptionSite}>ADOPT NOW</Button>
          <Button onClick={removeFavItemHandler} danger>
            DELETE
          </Button>
        </Card>
      </li>
    </Card>
  );
};

export default FavouriteItem;
