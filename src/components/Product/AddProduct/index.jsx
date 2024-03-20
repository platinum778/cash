import React, {useState} from "react";
import css from "./style.module.css";
import {v4 as uuidv4} from "uuid";
import {useProduct} from "@/components/Context";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = ({edit, item, setActivePopup, setActivePopup1}) => {
    const {fetchProduct} = useProduct();
    const [formData, setFormData] = useState(
        edit
            ? {...item}
            : {
                id: uuidv4(),
                productName: "",
                purchasePrice: 0,
                sellingPrice: 0,
            }
    );
    const notify = () =>
        toast.success(edit ? "Успішно відредаговано" : "Успішно створено", {
            position: "bottom-right",
            autoClose: 3000,
            pauseOnHover: false,
        });

    const handleChange = (event) => {
        const {name, value, type} = event.target;
        const newValue = type === "number" ? Math.max(0, +value) : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const isDisabled =
        !formData.productName ||
        formData.purchasePrice - formData.sellingPrice >= 0 ||
        formData.purchasePrice <= 0 ||
        formData.sellingPrice <= 0;

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            // Отримуємо дані з локального сховища
            const localProducts = JSON.parse(localStorage.getItem("products")) || [];

            // Додаємо новий продукт до масиву локальних продуктів
            const updatedProducts = [...localProducts, formData];

            // Зберігаємо оновлений масив продуктів у локальному сховищі
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            fetchProduct();
            // notify();
            setActivePopup(false);
            setFormData({
                id: uuidv4(),
                productName: "",
                purchasePrice: '',
                sellingPrice: '',
            });


        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (event) => {
        try {
            event.preventDefault();
            const localProducts = JSON.parse(localStorage.getItem("products")) || [];

            // Оновлюємо дані продукту в масиві локальних продуктів
            const updatedProducts = localProducts.map((prod) =>
                prod.id === formData.id ? formData : prod
            );

            // Зберігаємо оновлений масив продуктів у локальному сховищі
            localStorage.setItem("products", JSON.stringify(updatedProducts));

            fetchProduct();
            notify();
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
                    title="Product name"
                    placeholder="Product name"
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
                    title="Purchase price"
                    placeholder="Purchase price"
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
                    title="Selling price"
                    placeholder="Selling price"
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
                {edit ? "Edit  product" : "Create product"}
            </button>
            <ToastContainer/>
        </form>
    );
};

export default AddProduct;
