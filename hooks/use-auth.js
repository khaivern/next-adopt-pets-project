import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

let timer;

const convertToMinutes = (millisecond) => {
  const seconds = millisecond / 1000;
  const minutes = seconds / 60;
  return Math.floor(minutes);
};

const useAuth = () => {
  const expiration = useSelector((state) => state.auth.expiration);
  // console.log(expiration, new Date(expiration));
  const dispatch = useDispatch();

  useEffect(() => {
    if (expiration) {
      dispatch(authActions.login({ expiration }));
    }
  }, [expiration, dispatch]);

  useEffect(() => {
    if (expiration) {
      const remainingTime =
        new Date(expiration).getTime() - new Date().getTime();
      console.log(`autologout in ${convertToMinutes(remainingTime)} minutes`);
      if (remainingTime > 0) {
        timer = setTimeout(() => dispatch(authActions.logout()), remainingTime);
      }
    } else {
      clearTimeout(timer); //manual logout or token expired
    }
  }, [expiration, dispatch]);
};

export default useAuth;
