import ReactDOM from "react-dom";

import classes from "./notification.module.css";

const Notification = (props) => {
  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  if (typeof window !== "undefined") {
    return ReactDOM.createPortal(
      <div className={cssClasses} onClick={props.onClick}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>,
      document.querySelector("#notification")
    );
  } else {
    return (
      <div className={cssClasses} onClick={props.onClick}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    );
  }
};

export default Notification;
