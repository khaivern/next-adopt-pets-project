import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

let timer;

const useAuth = () => {
  const expiration = useSelector((state) => state.auth.expiration);

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
      console.log(remainingTime);
      if (remainingTime > 0) {
        timer = setTimeout(() => dispatch(authActions.logout()), remainingTime);
      }
    } else {
      clearTimeout(timer); //manual logout or token expired
    }
  }, [expiration, dispatch]);
};

export default useAuth;
