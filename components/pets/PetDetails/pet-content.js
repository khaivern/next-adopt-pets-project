import React from "react";
import Button from "../../ui/Button/button";

import Card from "../../ui/Card/card";
import classes from "./pet-content.module.css";
const PetContent = ({ description, date, status, onFavButtonClick }) => {
  const formattedDate = new Date(date).toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className={classes.card}>
      <h3>Description</h3>
      <p>{description}</p>
      <h3>Posted on</h3>
      <time>{formattedDate}</time>
      <h3>Current Status</h3>
      <p>{status}</p>
      <Button danger onClick={onFavButtonClick}>
        ADD TO FAVOURITES
      </Button>
    </Card>
  );
};

export default PetContent;
