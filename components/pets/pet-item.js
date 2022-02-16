import Image from "next/image";
import Link from "next/link";
import React from "react";
import Card from "../ui/Card/card";

import classes from "./pet-item.module.css";

// layout="responsive"
const PetItem = ({ pet }) => {
  const shortenedDescription = () => {
    const description = new DOMParser().parseFromString(
      pet.description,
      "text/html"
    ).documentElement.textContent;
    const maxLength = 80;
    let trimmedString = description.substring(0, maxLength);
    trimmedString = trimmedString.substring(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );
    return trimmedString + " ...";
  };

  const name = pet.name.split(" ")[0];

  const description = shortenedDescription();
  const status = pet.status;
  const contact = pet.contact;
  const formattedDate = new Date(pet.published_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const petPath = `/pets/${pet.id}`;
  return (
    <li className={classes["pet-item"]}>
      <Link href={petPath}>
        <a>
          <Card>
            <div className={classes.wrapper}>
              <div className={classes["pet-item__image"]}>
                {pet.photos[0] && (
                  <img
                    src={pet.photos[0].large}
                    alt={pet.gender + " photo of " + name}
                    width={320}
                    height={320}
                  />
                )}
                {!pet.photos[0] && (
                  <img
                    src='images/notfound.png'
                    alt='No image provided'
                    width={280}
                    height={280}
                    style={{ marginLeft: "0.9rem" }}
                  />
                )}
              </div>
            </div>
            <div className={classes["pet-item__content--header"]}>
              <h2>{name}</h2>
              <p>{`${pet.age} ${pet.gender}`}</p>
            </div>
            <div className={classes["pet-item__content--description"]}>
              <p>
                {description !== "..."
                  ? description
                  : "No description available. 😿 "}
              </p>
            </div>
          </Card>
        </a>
      </Link>
    </li>
  );
};

export default PetItem;
