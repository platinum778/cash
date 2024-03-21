"use client";
import React from "react";
import css from "./style.module.css";
import {useProduct} from "@/components/Context";
import ProductItem from "@/components/Product/ProductItem";

const ProductList = () => {
    const {product, loadingProduct} = useProduct();
    if (loadingProduct) {
        return (
            <>
                <h3>Loading...</h3>
            </>
        );
    }
    return (
        <div>
            <div className={css.product}>
                <table className={css.product__table}>
                    {!loadingProduct && (
                        <thead>
                        <tr className={css.product__meta}>
                            <th className={css.product__title}>Редагувати</th>
                            <th
                                className={css.product__title + " " + css.product__title_id}
                            >
                                ID
                            </th>
                            <th
                                className={css.product__title + " " + css.product__title_name}
                            >
                                Назва продукту
                            </th>
                            <th className={css.product__title}>Маржа</th>
                            <th className={css.product__title}>Ціна закупки</th>
                            <th className={css.product__title}>Ціна продажу</th>
                            <th className={css.product__title}>Видалити</th>
                        </tr>
                        </thead>
                    )}
                    <tbody>
                    {product?.map((item, index) => (
                        <ProductItem key={item.id} item={item} index={index}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
