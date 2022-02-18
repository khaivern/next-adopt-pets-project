import React, { useState } from "react";
import { signIn } from "next-auth/react";

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
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useRouter } from "next/router";
import LoadingSpinner from "../ui/LoadingSpinner/loading-spinner";
import ErrorModal from "../ui/ErrorModal/error-modal";

const Signup = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const router = useRouter();
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

  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    toggleLoading,
    generateError,
  } = useHttp(false);

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

  const dispatch = useDispatch();

  const createUserRequest = async () => {
    const { email, name, password } = formState.inputs;
    try {
      const resp = await sendRequest("/api/auth/signup", "POST", {
        email: email.val,
        name: name.val,
        password: password.val,
      });

      if (resp.error) throw new Error(resp.message || "Failed to create user");
      setIsLoginMode(true);
    } catch (err) {}
  };

  const authHandler = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      toggleLoading();
      const { email, password } = formState.inputs;

      const result = await signIn("credentials", {
        redirect: false,
        email: email.val,
        password: password.val,
      });
      if (!result.error) {
        // redirect and store
        const expiration = new Date(new Date().getTime() + 1000 * 60 * 45);
        dispatch(
          authActions.login({
            expiration: expiration.toISOString(),
          })
        );
        router.push("/");
      } else {
        generateError(result.error);
        toggleLoading();
      }
    } else {
      createUserRequest();
    }
  };
  return (
    <section className={classes.section}>
      {isLoading && (
        <LoadingSpinner
          loadingText={isLoginMode ? "Loggin ya in.." : "Creating your account"}
        />
      )}
      {error && <ErrorModal error={error} onClear={clearError} />}
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
            <Button type='submit' disabled={!formState.overall}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
            <Button type='button' inverse onClick={switchModeHandler}>
              SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
            </Button>
          </div>
        </form>

        <pre>
          {JSON.stringify(
            {
              message: "Testing Account",
              email: "admin@gmail.com",
              password: "1234",
            },
            null,
            2
          )}
        </pre>
      </Card>
    </section>
  );
};

export default Signup;
