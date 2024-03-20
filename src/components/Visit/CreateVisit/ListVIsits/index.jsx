import React from "react";
import InputVisit from "../InputVisit";
import { MdDelete } from "react-icons/md";
import css from "./style.module.css";

const ListVisit = ({ visit, setVisit }) => {
  const handleDelete = (id) => {
    console.log("id", id);
    const updatedVisit = visit.filter((item) => item.id !== id);
    setVisit(updatedVisit);
  };
  return (
    <ul className={css.right__list}>
    
      <li className={css.right__item}>
        <p className={css.right__name}>Title</p>
        <p className={css.right__count}>Count</p>
        <p className={css.right__price}>Price</p>
        <button className={css.left__btn}>Delete</button>
      </li>
      {visit?.map((i) => (
        <li key={i.id} className={css.left__item}>
          <p className={css.right__name}>{i.productName}</p>
          <div className={css.right__label}>
            <InputVisit setVisit={setVisit} i={i} />
          </div>
          <p className={css.right__price}>{i.sellingPrice}</p>
          <button className={css.right__btn}>
            <MdDelete size={30} onClick={() => handleDelete(i.id)} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListVisit;
