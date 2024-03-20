"use client";
import React from "react";
import css from "./style.module.css";
import { IoClose } from "react-icons/io5";
import { useLockBodyScroll } from "@custom-react-hooks/all";
const ProductAdd = ({ activePopup, setActivePopup, children }) => {
  useLockBodyScroll(activePopup);

  return (
    <div
      className={activePopup ? css.popup__active + " " + css.popup : css.popup}
      onClick={() => setActivePopup(false)}
    >
      <div className={css.popup__contain} onClick={(e) => e.stopPropagation()}>
        <IoClose
          className={css.popup__close}
          size={30}
          onClick={() => setActivePopup(false)}
        />
        {children}
      </div>
    </div>
  );
};

export default ProductAdd;
