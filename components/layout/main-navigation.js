import Link from "next/link";
import React from "react";
import Logo from "./logo";
import NavLinks from "./nav-links";

import classes from "./main-navigation.module.css";

const MainNavigation = () => {
  return (
    <nav className={classes["main-navigation"]}>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <NavLinks />
    </nav>
  );
};

export default MainNavigation;
