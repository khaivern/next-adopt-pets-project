import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import Button from "../ui/Button/button";
import classes from "./nav-links.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

const NavLinks = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log(session);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <Link href='/'>ALL PETS</Link>
      </li>
      <li>
        <Link href='/pet/pid'>PICK RANDOM PET</Link>
      </li>
      {session && !loading && (
        <li>
          <Link href='/user/uid'>MY FAVOURITES</Link>
        </li>
      )}
      {!session && !loading && (
        <li>
          <Link href='/auth'>LOGIN</Link>
        </li>
      )}
      {session && !loading && (
        <Button className={classes["nav-button"]} onClick={logoutHandler}>
          LOGOUT
        </Button>
      )}
    </ul>
  );
};

export default NavLinks;
