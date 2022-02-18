import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { notiActions } from "../store/notification-slice";

let timer;

const useNotification = () => {
  const { title, message, status } = useSelector((state) => state.noti.data);
  console.log(title);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!title || !message || !status) return;

    if (status === "success" || status === "error") {
      timer = setTimeout(() => {
        dispatch(notiActions.clearNotification());
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, message, status, title]);

  return { title, message, status };
};

export default useNotification;
