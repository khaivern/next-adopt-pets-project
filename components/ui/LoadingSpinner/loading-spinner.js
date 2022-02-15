import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./loading-spinner.module.css";

const LoadingSpinner = () => {
  return (
    <Fragment>
      <Backdrop />
      <div className={classes.cat}>
        <div className={classes.cat__body}></div>
        <div className={classes.cat__body}></div>
        <div className={classes.cat__tail}></div>
        <div className={classes.cat__head}></div>
      </div>
    </Fragment>
  );
};

export default LoadingSpinner;
