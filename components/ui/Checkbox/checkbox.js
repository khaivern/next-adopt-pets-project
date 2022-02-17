import React, { Fragment } from "react";

import classes from "./checkbox.module.css";

const Checkbox = ({ checked, label = "Checkbox" }) => {
  return (
    <div>
      <div className={classes.box}>
        <input id='one' type='checkbox' checked={checked} disabled />
        <span className={classes.check}></span>
        <label htmlFor='one'>{label}</label>
      </div>
    </div>
  );
};

export default Checkbox;
