import Image from "next/image";
import Link from "next/link";
import React from "react";

import classes from "./pet-item.module.css";

// layout="responsive"
const PetItem = ({ id, title }) => {
  const petPath = `/pets/${id}`;
  return (
    <li className={classes.pet}>
      <Link href={petPath}>
        <a>
          <div className={classes.image}>
            <Image src={imagePath} alt={title} width={300} height={200} />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PetItem;
