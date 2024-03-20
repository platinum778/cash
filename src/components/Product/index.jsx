"use client";
import React, { useState } from "react";
import css from "./style.module.css";
import ProductList from "./ProductList";
import PopUp from "./PopUp";
import AddProduct from "./AddProduct";

const Product = () => {
  const [activePopup, setActivePopup] = useState(false);

  return (
    <>
      <div className={css.product}>
        <div className="container">
          <div className={css.product__wrapper}>
            <div className={css.product__nav}>
              <button
                className={css.product__btn}
                onClick={() => setActivePopup(true)}
              >
                Create product
              </button>
            </div>
            <div className={css.prodcut__inner}>
              <ProductList />
            </div>
          </div>
        </div>
      </div>
      <PopUp activePopup={activePopup} setActivePopup={setActivePopup}>
        <AddProduct setActivePopup={setActivePopup} />
      </PopUp>
    </>
  );
};

export default Product;
