import Link from "next/link";
import React from "react";

import classes from "./button.module.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`${classes.button} ${
          classes[`button--${props.size || "default"}`]
        } ${props.inverse && classes["button--inverse"]} ${
          props.danger && classes["button--danger"]
        }`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        href={props.to}
        className={`${classes.button} ${
          classes[`button--${props.size || "default"}`]
        } ${props.inverse && classes["button--inverse"]} ${
          props.danger && classes["button--danger"]
        }`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${classes.button} ${props.className && props.className} ${
        classes[`button--${props.size || "default"}`]
      } ${props.inverse && classes["button--inverse"]} ${
        props.danger && classes["button--danger"]
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
