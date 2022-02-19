import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { notiActions } from "../store/notification-slice";

let timer;

const useNotification = () => {
  const { title, message, status } = useSelector((state) => state.noti.data);
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

  const sendNotification = useCallback(
    (title, message, status) => {
      return dispatch(
        notiActions.createNotification({
          title: title,
          message: message,
          status: status,
        })
      );
    },
    [dispatch]
  );

  const clearNotification = useCallback(
    () => dispatch(notiActions.clearNotification()),
    [dispatch]
  );

  const removeFavouritePet = useCallback(
    async (id) => {
      sendNotification("Deleting", "Pet is being banished away", "pending");
      const resp = await axios({
        url: `/api/user/${id}`,
        method: "DELETE",
      });
      if (resp.status !== 200) {
        sendNotification(
          "Success ✔",
          "Pet has been removed from this list successfully",
          "success"
        );
      } else {
        sendNotification(
          "Error",
          "The pet has managed to hide itself. Please try again later",
          "error"
        );
      }
    },
    [sendNotification]
  );

  const addPetToFavouriteList = useCallback(
    async (petData) => {
      sendNotification(
        "Sending",
        "this pet is being sent to your favourite's list",
        "pending"
      );
      const resp = await axios({
        url: "/api/user/favourites",
        method: "POST",
        data: petData,
      });
      const data = resp.data;
      if (resp.status === 201) {
        sendNotification(
          "Success ✔",
          "The pet data is now stored safely",
          "success"
        );
      } else {
        sendNotification(
          "Not Good 😥",
          "the pet managed to escape our grip sadly... please try again later",
          "error"
        );
      }
      return resp.status;
    },
    [sendNotification]
  );
  return {
    title,
    message,
    status,
    sendNotification,
    clearNotification,
    sendPetData: addPetToFavouriteList,
    removeFavouritePet,
  };
};

export default useNotification;
