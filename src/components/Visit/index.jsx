"use client";
import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import PopUp from "@/components/Product/PopUp";
import CreateVisit from "./CreateVisit";
import axios from "axios";
import { VISIT_URL } from "@/utils/constans";
import moment from "moment";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Visit = () => {
  const [activePopup, setActivePopup] = useState(false);
  const [visitLoading, setVisitLoading] = useState(false);
  const [visit, setVisit] = useState([]);
  const [dateRange, setDateRange] = useState([null]);

  useEffect(() => {
    fetchVisit();
  }, []);

  const notify = () =>
    toast.success("Succesfuly delete", {
      position: "bottom-right",
      autoClose: 3000,
      pauseOnHover: false,
    });

  const fetchVisit = async () => {
    try {
      const response = await axios.get(VISIT_URL);
      if (response) {
        setVisit(response.data);
        setVisitLoading(true);
        console.log("datapicker", dateRange);
      }
    } catch (error) {
      console.error("Error fetching visit data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${VISIT_URL}/${id}`);
      if (response) {
        notify();
        fetchVisit();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const filteredArray = visit.filter((item) => {
    if (dateRange[0] && dateRange[1]) {
      return moment(item.date).isBetween(
        dateRange[0],
        dateRange[1],
        null,
        "[]"
      );
    }
    return true;
  });
  console.log("filteredArray", filteredArray);
  const totalPurchasePrice = visit.reduce(
    (sum, obj) => obj.totalPurchasePrice + sum,
    0
  );

  const totalSellingPrice = visit.reduce(
    (sum, obj) => obj.totalSellingPrice + sum,
    0
  );
  const totalPurchasePriceDate = filteredArray.reduce(
    (sum, obj) => obj.totalPurchasePrice + sum,
    0
  );

  const totalSellingPriceDate = filteredArray.reduce(
    (sum, obj) => obj.totalSellingPrice + sum,
    0
  );

  return (
    <>
      <div className={css.visit}>
        <div className="container">
          <div className={css.wrapper}>
            <nav className={css.nav}>
              <button className={css.btn} onClick={() => setActivePopup(true)}>
                Create visit
              </button>
              <div className={css.nav__inner}>
                <span>Sort by date:</span>
                <div className={css.nav__meta}>
                  <DatePicker
                    className={css.datePicker}
                    selected={dateRange[0]}
                    onChange={(date) => setDateRange([date, dateRange[1]])}
                    selectsStart
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    dateFormat="yy-MM-dd"
                    placeholderText="Start Date"
                  />
                  <DatePicker
                    className={css.datePicker}
                    selected={dateRange[1]}
                    onChange={(date) => setDateRange([dateRange[0], date])}
                    selectsEnd
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    minDate={dateRange[0]}
                    dateFormat="yy-MM-dd"
                    placeholderText="End Date"
                  />
                </div>
              </div>
            </nav>
            <ul className={css.list}>
              <li className={css.item}>
                <span className={css.date}>Date</span>
                <span className={css.products}>Products</span>
                <span className={css.purchasePrice}>
                  Purchase price:
                  {dateRange[0] && dateRange[1]
                    ? totalPurchasePriceDate
                    : totalPurchasePrice}
                </span>
                <span className={css.sellingPrice}>
                  Selling price:{" "}
                  {dateRange[0] && dateRange[1]
                    ? totalSellingPriceDate
                    : totalSellingPrice}
                </span>
                <span className={css.diffirence}>
                  Diffirence:{" "}
                  {dateRange[0] && dateRange[1]
                    ? totalSellingPriceDate - totalPurchasePriceDate
                    : totalSellingPrice - totalPurchasePrice}
                </span>
                <span className={css.delete}>Delete</span>
              </li>
              {visitLoading ? (
                dateRange[0] && dateRange[1] ? (
                  filteredArray.map((i) => (
                    <li key={i.id} className={css.item}>
                      <span className={css.date}>
                        {moment(i.date).format("DD.MM.YY")}
                      </span>
                      <span className={css.products}>
                        <ol className={css.products__list}>
                          {i.products.map((item) => (
                            <li className={css.products__item} key={item.id}>
                              {item.productName} x {item.count}{" "}
                            </li>
                          ))}
                        </ol>
                      </span>
                      <span className={css.purchasePrice}>
                        {i.products.reduce(
                          (sum, obj) => obj.purchasePrice * obj.count + sum,
                          0
                        )}
                      </span>
                      <span className={css.sellingPrice}>
                        {i.products.reduce(
                          (sum, obj) => obj.sellingPrice * obj.count + sum,
                          0
                        )}
                      </span>
                      <span className={css.diffirence}>
                        {i.products.reduce(
                          (sum, obj) => obj.sellingPrice * obj.count + sum,
                          0
                        ) -
                          i.products.reduce(
                            (sum, obj) => obj.purchasePrice * obj.count + sum,
                            0
                          )}
                      </span>
                      <span className={css.delete}>
                        <button
                          className={css.button}
                          onClick={() => handleDelete(i.id)}
                        >
                          <MdOutlineDeleteOutline size={27} />
                        </button>
                      </span>
                    </li>
                  ))
                ) : (
                  visit.map((i) => (
                    <li key={i.id} className={css.item}>
                      <span className={css.date}>
                        {moment(i.date).format("DD.MM.YY")}
                      </span>
                      <span className={css.products}>
                        <ol className={css.products__list}>
                          {i.products.map((item) => (
                            <li className={css.products__item} key={item.id}>
                              {item.productName} x {item.count}{" "}
                            </li>
                          ))}
                        </ol>
                      </span>
                      <span className={css.purchasePrice}>
                        {i.products.reduce(
                          (sum, obj) => obj.purchasePrice * obj.count + sum,
                          0
                        )}
                      </span>
                      <span className={css.sellingPrice}>
                        {i.products.reduce(
                          (sum, obj) => obj.sellingPrice * obj.count + sum,
                          0
                        )}
                      </span>
                      <span className={css.diffirence}>
                        {i.products.reduce(
                          (sum, obj) => obj.sellingPrice * obj.count + sum,
                          0
                        ) -
                          i.products.reduce(
                            (sum, obj) => obj.purchasePrice * obj.count + sum,
                            0
                          )}
                      </span>
                      <span className={css.delete}>
                        <button
                          className={css.button}
                          onClick={() => handleDelete(i.id)}
                        >
                          <MdOutlineDeleteOutline size={27} />
                        </button>
                      </span>
                    </li>
                  ))
                )
              ) : (
                <p>Loading...</p>
              )}
            </ul>
          </div>
        </div>
      </div>
      <PopUp activePopup={activePopup} setActivePopup={setActivePopup}>
        <CreateVisit fetchVisit={fetchVisit} setActivePopup={setActivePopup} />
      </PopUp>
    </>
  );
};

export default Visit;
