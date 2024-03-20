"use client";
import React, { useState } from "react";
import css from "./style.module.css";
import { MdDelete } from "react-icons/md";
import { PRODUCT_URL } from "@/utils/constans";
import { FaEdit } from "react-icons/fa";
import PopUp from "@/components/Product/PopUp";
import axios from "axios";
import { useProduct } from "@/components/Context";
import AddProduct from "../AddProduct";
import { toast } from "react-toastify";

const ProductItem = ({ item }) => {
  const { id, productName, purchasePrice, sellingPrice } = item;
  const difference = sellingPrice - purchasePrice;

  const [activePopup, setActivePopup] = useState(false);
  const { fetchProduct } = useProduct();
  const notify = (name) =>
    toast.success(name, {
      position: "bottom-right",
      autoClose: 3000,
      pauseOnHover: false,
    });

  const handleDelete = () => {
    try {
      const localProducts = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = localProducts.filter((product) => product.id !== id);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      notify("Успішно видалено!");
      fetchProduct();
    } catch (error) {
      console.error("Error delete product", error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };
  return (
    <>
      <tr className={css.product__tr}>
        <td>
          <button
            className={css.product__icon}
            onClick={() => setActivePopup(true)}
          >
            <FaEdit size={30} />
          </button>
          <PopUp activePopup={activePopup} setActivePopup={setActivePopup}>
            <AddProduct
              edit={true}
              setActivePopup1={setActivePopup}
              item={item}
            />
          </PopUp>
        </td>
        <td>{id} </td>
        <td
          className={css.product__td}
          onClick={() => copyToClipboard(productName)}
        >
          {productName}
        </td>
        <td>{difference}</td>
        <td>{purchasePrice}</td>
        <td>{sellingPrice}</td>
        <td>
          <button className={css.product__icon} onClick={() => handleDelete()}>
            <MdDelete size={30} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
