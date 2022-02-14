import React, { useState } from "react";
import useForm from "../../hooks/use-form";
import useHttp from "../../hooks/use-http";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../util/validators";
import Button from "../ui/Button/button";
import Card from "../ui/Card/card";
import Input from "../ui/Input/input";

import classes from "./signup.module.css";

const Signup = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { formState, inputHandler, setForm } = useForm({
    inputs: {
      email: {
        val: "",
        isValid: false,
      },
      password: {
        val: "",
        isValid: false,
      },
    },
    overall: false,
  });

  const { isLoading, error, sendRequest, clearError } = useHttp(false);

  const switchModeHandler = () => {
    if (isLoginMode) {
      const inputs = {
        ...formState.inputs,
        name: {
          val: "",
          isValid: false,
        },
      };
      setForm(inputs, false);
    } else {
      const inputs = {
        ...formState.inputs,
        name: null,
      };
      const { email, password } = formState.inputs;
      const overall = email.isValid && password.isValid;

      setForm(inputs, overall);
    }
    setIsLoginMode((curr) => !curr);
  };

  const authHandler = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
    } else {
      const { email, name, password } = formState.inputs;
      try {
        const resp = await sendRequest("/api/auth/signup", "POST", {
          email: email.val,
          name: name.val,
          password: password.val,
        });
        const data = resp.data;
        console.log(data);
      } catch (err) {}
    }
  };
  return (
    <section className={classes.section}>
      <Card className={classes["auth-card"]}>
        <h1>LOGIN</h1>
        <hr />
        <form onSubmit={authHandler}>
          {!isLoginMode && (
            <Input
              className={`${classes["auth-input"]} ${classes["signup-input"]}`}
              element='input'
              type='text'
              id='name'
              label='🙉 Your Name'
              placeHolder='Names are sacred not to be shared with'
              errorText='Name cannot be empty'
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          )}

          <Input
            className={classes["auth-input"]}
            element='input'
            id='email'
            type='email'
            label='📧 E-mail'
            placeHolder='Email must have the @ symbol'
            errorText='Entered email is invalid'
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
          />
          <Input
            className={classes["auth-input"]}
            element='input'
            type='password'
            id='password'
            label='🔑 Password'
            placeHolder='Password must be at least 4 chars long'
            errorText='Entered password is invalid'
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(4)]}
          />

          <div className={classes.actions}>
            <Button disabled={!formState.overall}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
            <Button inverse onClick={switchModeHandler}>
              SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
            </Button>
          </div>
        </form>
        <pre>{JSON.stringify(formState, null, 2)}</pre>
      </Card>
    </section>
  );
};

export default Signup;
