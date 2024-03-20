import React from "react";
import css from "./style.module.css";

const Notification = ({ title, alert }) => {
  return (
    <>
      <div className={alert ? css.notification__container : css.default}>
        <p className={css.notification__item}>{title}</p>
      </div>
    </>
  );
};

export default Notification;
