import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { notiActions } from "../../store/notification-slice";
import Button from "../ui/Button/button";
import Card from "../ui/Card/card";

import classes from "./pet-item.module.css";

export const sendPetData = async (petData) => {
  const resp = await axios({
    url: "/api/user/favourites",
    method: "POST",
    data: petData,
  });
  const data = resp.data;

  return { status: resp.status, data: data };
};

// layout="responsive"
const PetItem = ({ pet }) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const loading = status === "loading";
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
    return trimmedString + " ➡";
  };

  const name = pet.name.split(" ")[0];
  const description = shortenedDescription();
  const tags = pet.tags.slice(0, 4);
  const formattedDate = new Date(pet.published_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const addToFavouritesHandler = () => {
    dispatch(
      notiActions.createNotification({
        title: "Sending",
        message: "this pet data is being sent to your favourite's list",
        status: "pending",
      })
    );
    const petData = {
      image: pet.photos[0].large,
      name: name,
      type: pet.type,
      species: pet.species,
      adoptionSite: pet.url,
      gender: pet.gender,
      age: pet.age,
    };
    const { status, data } = sendPetData(petData);
    if (status !== 201) {
      dispatch(
        notiActions.createNotification({
          title: "Not Good 😥",
          message:
            "the pet managed to escape our grip sadly... please try again later",
          status: "error",
        })
      );
    } else {
      dispatch(
        notiActions.createNotification({
          title: "Success ✔",
          message: "The pet data is now stored safely",
          status: "success",
        })
      );
    }
  };

  const petPath = `/pets/${pet.id}`;
  return (
    <li className={classes["pet-item"]}>
      <Card className={classes["pet-item__card"]}>
        <Link href={petPath}>
          <a>
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
          </a>
        </Link>
        <div className={classes["pet-item__content"]}>
          <div className={classes["pet-item__content--header"]}>
            <div className={classes["header__main"]}>
              <h2>{name}</h2>
              <p>{`${pet.age} ${pet.gender}`}</p>
            </div>
            <time>{formattedDate}</time>
          </div>
          <div className={classes["pet-item__content--description"]}>
            <p>
              {description !== "..."
                ? description
                : "No description available. 😿 "}
            </p>
            {tags.map((tag) => (
              <Button key={tag}>{tag}</Button>
            ))}
          </div>
          {session && !loading && (
            <div className={classes["pet-item__content--actions"]}>
              <Button type='button' onClick={addToFavouritesHandler}>
                💝 ADD TO FAVOURITES 💝
              </Button>
            </div>
          )}
        </div>
      </Card>
    </li>
  );
};

export default PetItem;
