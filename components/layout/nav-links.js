import Link from "next/link";
import React from "react";

import classes from "./nav-links.module.css";

const NavLinks = () => {
  return (
    <ul className={classes["nav-links"]}>
      <li>
        <Link href='/'>ALL PETS</Link>
      </li>
      <li>
        <Link href='/pet/pid'>PICK RANDOM PET</Link>
      </li>
      <li>
        <Link href='/user/uid'>MY FAVOURITES</Link>
      </li>
      <li>
        <Link href='/auth'>LOGIN</Link>
      </li>
    </ul>
  );
};

export default NavLinks;
