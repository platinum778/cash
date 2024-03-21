import React, {useState} from "react";
import css from "./style.module.css";
import {v4 as uuidv4} from "uuid";
import {useProduct} from "@/components/Context";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = ({edit, item, setActivePopup, setActivePopup1}) => {
    const {fetchProduct} = useProduct();
    const [formData, setFormData] = useState(edit ? {...item} : {
        id: uuidv4(), productName: "", purchasePrice: 0, sellingPrice: 0,
    });
    const notify = () => toast.success(edit ? "Успішно відредаговано" : "Успішно створено", {
        position: "bottom-right", autoClose: 3000, pauseOnHover: false,
    });

    const handleChange = (event) => {
        const {name, value, type} = event.target;
        const newValue = type === "number" ? Math.max(0, +value) : value;
        setFormData((prevData) => ({
            ...prevData, [name]: newValue,
        }));
    };

    const isDisabled = !formData.productName || formData.purchasePrice - formData.sellingPrice >= 0 || formData.purchasePrice <= 0 || formData.sellingPrice <= 0;

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            const localProducts = JSON.parse(localStorage.getItem("products")) || [];
            const updatedProducts = [...localProducts, formData];
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            fetchProduct();
            setActivePopup(false);
            setFormData({
                id: uuidv4(), productName: "", purchasePrice: '', sellingPrice: '',
            });

        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (event) => {
        try {
            event.preventDefault();
            const localProducts = JSON.parse(localStorage.getItem("products")) || [];
            const updatedProducts = localProducts.map((prod) => prod.id === formData.id ? formData : prod);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            fetchProduct();
            setActivePopup1(false);
        } catch (error) {
            console.error("Error with editing product", error);
        }
    };


    return (
        <form
            className={css.product__form}
            onSubmit={edit ? handleEdit : handleSubmit}
        >
            <label className={css.product__label}>
                <span>Product name</span>
                <input
                    className={css.product__input}
                    title="Назва товару"
                    placeholder="Назва товару"
                    type="text"
                    name={"productName"}
                    value={formData.productName}
                    onChange={handleChange}
                    required
                />
            </label>

            <label className={css.product__label}>
                <span>Purchase price</span>
                <input
                    className={css.product__input}
                    title="Ціна Закупки"
                    placeholder="Ціна Закупки"
                    type="number"
                    min="0"
                    name={"purchasePrice"}
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    required
                />
            </label>
            <label className={css.product__label}>
                <span>Selling price</span>
                <input
                    className={css.product__input}
                    title="Ціна продажу"
                    placeholder="Ціна продажу"
                    type="number"
                    min="0"
                    name={"sellingPrice"}
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    required
                />
            </label>
            <button
                className={css.product__submit}
                type="submit"
                disabled={isDisabled}
            >
                {edit ? "Редагувати" : "Створити товар"}
            </button>
            <ToastContainer/>
        </form>);
};

export default AddProduct;
