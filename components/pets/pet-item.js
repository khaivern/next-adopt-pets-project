import Image from "next/image";
import Link from "next/link";
import React from "react";
import Card from "../ui/Card/card";

import classes from "./pet-item.module.css";

// layout="responsive"
const PetItem = ({ pet }) => {
  const description = pet.description;
  const status = pet.status;
  const contact = pet.contact;
  const formattedDate = new Date(pet.published_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log(pet.photos[0]);
  const petPath = `/pets/${pet.id}`;
  return (
    <li className={classes["pet-item"]}>
      <Link href={petPath}>
        <a>
          <Card>
            <div className={classes["pet-item__image"]}>
              {/* <Image
                src={pet.photos[0].medium}
                alt={pet.gender + " photo of " + pet.name}
                width={300}
                height={200}
              /> */}
            </div>
            <div className={classes["pet-item__content--header"]}>
              <h2>{pet.name}</h2>
              <p>{`${pet.age} ${pet.gender}`}</p>
            </div>
          </Card>
        </a>
      </Link>
    </li>
  );
};

export default PetItem;
