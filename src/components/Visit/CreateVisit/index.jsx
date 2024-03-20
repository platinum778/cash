"use client";
import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { useProduct } from "@/components/Context";
import { FaPlus } from "react-icons/fa";
import ListVisit from "./ListVIsits";
import { VISIT_URL } from "@/utils/constans";
import axios from "axios";
import { toast } from "react-toastify";

const CreateVisit = ({ setActivePopup, fetchVisit }) => {
  const [visit, setVisit] = useState([]);

  const { product } = useProduct();
  const notify = () =>
    toast.success("Succesfuly create", {
      position: "bottom-right",
      autoClose: 3000,
      pauseOnHover: false,
    });
  const handleAdd = (item) => {
    const double = visit.find((i) => i.id === item.id);
    if (double) {
      setVisit((prevVisit) =>
        prevVisit.map((i) =>
          i.id === item.id ? { ...i, count: i.count + 1 } : i
        )
      );
    } else {
      setVisit((prevVisit) => [...prevVisit, { ...item, count: 1 }]);
      console.log("visit:", visit);
    }
  };

  const totalPrice = visit.reduce(
    (sum, obj) => obj.sellingPrice * obj.count + sum,
    0
  );
  const totalPurchasePrice = visit.reduce(
    (sum, obj) => obj.purchasePrice * obj.count + sum,
    0
  );
  console.log("purchasePrice", totalPurchasePrice);
  const saveVisit = async () => {
    let date = new Date();

    const visitDate = {
      date: date,
      products: visit,
      id: 0,
      totalSellingPrice: totalPrice,
      totalPurchasePrice: totalPurchasePrice,
    };
    console.log(visitDate);

    try {
      const respons = await axios.post(VISIT_URL, visitDate, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (respons) {
        notify();
        fetchVisit();
        setVisit([]);
        setActivePopup(false);
      }
    } catch (error) {
      console.error("Save visit error");
    }
  };
  return (
    <div className={css.visit__wrapper}>
      <ul className={css.left__list}>
        <li className={css.left__item}>
          <p className={css.left__name}>Title</p>
          <p className={css.left__price}>Price</p>
          <button className={css.left__btn}>Delete</button>
        </li>
        {product.map((i) => (
          <li key={i.id} className={css.left__item}>
            <p className={css.left__name}>{i.productName}</p>
            <p className={css.left__price}>{i.sellingPrice}</p>
            <button className={css.left__btn} onClick={() => handleAdd(i)}>
              <FaPlus size={18} />
            </button>
          </li>
        ))}
      </ul>
      <div className={css.right__wrapper}>
        <ListVisit visit={visit} setVisit={setVisit} />
        <div className={css.right__inner}>
          <span className={css.right__totalPrice}>
            Total price: {totalPrice} грн.
          </span>
          <button
            className={css.right__button}
            disabled={visit.length === 0}
            onClick={saveVisit}
          >
            Create visit
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateVisit;
