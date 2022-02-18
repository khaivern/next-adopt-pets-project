import Link from "next/link";
import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import Button from "../ui/Button/button";
import classes from "./nav-links.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

const NavLinks = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <Fragment>
      <ul className={classes["nav-links"]}>
        <li>
          <Link href='/'>ALL PETS</Link>
        </li>
        {session && !loading && (
          <li>
            <Link href={`/user/${session.user._id}`}>MY FAVOURITES</Link>
          </li>
        )}
        {!session && !loading && (
          <li>
            <Link href='/auth'>LOGIN</Link>
          </li>
        )}
      </ul>
      {session && !loading && (
        <Button className={classes["nav-button"]} onClick={logoutHandler}>
          LOGOUT
        </Button>
      )}
    </Fragment>
  );
};

export default NavLinks;
