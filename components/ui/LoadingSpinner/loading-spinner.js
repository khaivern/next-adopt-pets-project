import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./loading-spinner.module.css";

const LoadingSpinner = ({ loadingText }) => {
  return (
    <Fragment>
      <Backdrop />
      <div className={classes.cat}>
        <div className={classes.cat__body}></div>
        <div className={classes.cat__body}></div>
        <div className={classes.cat__tail}></div>
        <div className={classes.cat__head}></div>
      </div>
      <div className={classes["cat__loading--text"]}>
        <h2>{loadingText ? loadingText : "Loading..."}</h2>
      </div>
    </Fragment>
  );
};

export default LoadingSpinner;
