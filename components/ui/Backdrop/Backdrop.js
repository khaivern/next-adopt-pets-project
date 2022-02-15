import React from "react";
import ReactDOM from "react-dom";

import classes from "./backdrop.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

export default Backdrop;
