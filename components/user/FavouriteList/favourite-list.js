import Link from "next/link";
import React from "react";
import PetItem from "../../pets/pet-item";
import Button from "../../ui/Button/button";
import Card from "../../ui/Card/card";
import FavouriteItem from "../FavouriteItem/favourite-item";

import classes from "./favourite-list.module.css";

const FavouriteList = ({ pets }) => {
  if (pets.length === 0) {
    return (
      <Card>
        <div>
          <h2>No Favourites added yet</h2>
          <Link href='/'>
            <a>
              <Button> Try adding one</Button>
            </a>
          </Link>
        </div>
      </Card>
    );
  }
  return (
    <Card>
      <ul className={classes.list}>
        {pets.map((pet) => (
          <FavouriteItem key={pet.id} pet={pet} />
        ))}
      </ul>
    </Card>
  );
};

export default FavouriteList;
