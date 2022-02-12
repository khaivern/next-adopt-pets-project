import React, { Fragment } from "react";
import MainNavigation from "./main-navigation";
import DoggoSVG from "../svgs/doggo";
import CattySVG from "../svgs/catty";

import classes from "./layout.module.css";
const Layout = (props) => {
  return (
    <Fragment>
      <div className={classes["container"]}>
        <div
          className={`${classes["bird-container"]} ${classes["bird-container--one"]}`}
        >
          <div className={`${classes["bird"]} ${classes["bird--one"]}`}></div>
        </div>

        <div
          className={`${classes["bird-container"]} ${classes["bird-container--two"]}`}
        >
          <div className={`${classes["bird"]} ${classes["bird--two"]}`}></div>
        </div>
        <div
          className={`${classes["bird-container"]} ${classes["bird-container--three"]}`}
        >
          <div className={`${classes["bird"]} ${classes["bird--three"]}`}></div>
        </div>
        <div
          className={`${classes["bird-container"]} ${classes["bird-container--four"]}`}
        >
          <div className={`${classes["bird"]} ${classes["bird--four"]}`}></div>
        </div>
        <div className={classes["main-layout"]}>
          <DoggoSVG className={classes["hero-dog"]} />
          <MainNavigation />
          <CattySVG className={classes["hero-cat"]} />
        </div>
      </div>

      <main className={classes["main-content"]}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
