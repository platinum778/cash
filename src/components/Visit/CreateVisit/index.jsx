"use client";
import React, {useState} from "react";
import css from "./style.module.css";
import {useProduct} from "@/components/Context";
import {FaPlus} from "react-icons/fa";
import ListVisit from "./ListVIsits";
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateVisit = ({setActivePopup, fetchVisit}) => {
    const [visit, setVisit] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const {product} = useProduct();
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
                    i.id === item.id ? {...i, count: i.count + 1} : i
                )
            );
        } else {
            setVisit((prevVisit) => [...prevVisit, {...item, count: 1}]);
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
    const saveVisit = () => {
        try {

            const visitDate = {
                date: selectedDate,
                products: visit,
                id: 0,
                totalSellingPrice: totalPrice,
                totalPurchasePrice: totalPurchasePrice,
            };
            console.log(visitDate);
            const localVisits = JSON.parse(localStorage.getItem("visits")) || [];
            const id = Math.floor(Math.random() * 1000000);
            const updatedVisits = [...localVisits, {...visitDate, id}];
            localStorage.setItem("visits", JSON.stringify(updatedVisits));
            notify();
            fetchVisit();
            setVisit([]);
            setActivePopup(false);
        } catch (error) {
            console.error("Save visit error");
        }
    };

    return (
        <>
            <DatePicker
                className={css.datePicker}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
            />

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
                                <FaPlus size={18}/>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className={css.right__wrapper}>
                    <ListVisit visit={visit} setVisit={setVisit}/>
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
        </>
    );
};
export default CreateVisit;
