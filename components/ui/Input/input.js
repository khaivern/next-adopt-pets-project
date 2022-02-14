import React, { useEffect, useReducer } from "react";

import { validate } from "../../../util/validators";
import classes from "./input.module.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCHED":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatchInputAction] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const changeHandler = (e) => {
    dispatchInputAction({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const blurHandler = (e) => {
    dispatchInputAction({
      type: "TOUCHED",
    });
  };

  const { value, isValid } = inputState;
  const { id, onInput } = props;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const content =
    props.element === "input" ? (
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeHolder}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows='5'
        placeholder={props.placeHolder}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    );

  const hasError = inputState.isTouched && !inputState.isValid;
  return (
    <div
      className={`${classes["form-control"]} ${props.className} ${
        hasError && classes["form-control--invalid"]
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {content}
      {hasError && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
