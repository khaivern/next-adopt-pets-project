import Link from "next/link";
import React from "react";
import Button from "../../ui/Button/button";
import Card from "../../ui/Card/card";
import FavouriteItem from "../FavouriteItem/favourite-item";
import { v4 as uuid } from "uuid";
import classes from "./favourite-list.module.css";

const FavouriteList = ({ pets, onRemovePet }) => {
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
          <FavouriteItem
            key={pet.id + "-" + uuid()}
            pet={pet}
            onRemovePet={onRemovePet}
          />
        ))}
      </ul>
    </Card>
  );
};

export default FavouriteList;
