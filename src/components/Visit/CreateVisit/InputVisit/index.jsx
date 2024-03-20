import React from "react";
import css from "./style.module.css";

const InputVisit = ({ setVisit, i }) => {
  const handleChange = (e, id) => {
    const { value } = e.target;
    console.log(value);
    console.log("id", id);
    const updatedVisit = { ...i, count: value || 1 };
    setVisit((prevVisit) =>
      prevVisit.map((item) => (item.id === i.id ? updatedVisit : item))
    );
  };
  return (
    <label>
      <input
        className={css.right__count}
        type="text"
        value={i.count}
        onChange={() => handleChange(event, i.id)}
      />
    </label>
  );
};

export default InputVisit;
