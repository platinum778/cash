"use client";
import { useEffect, useState, createContext, useContext } from "react";

const ProductContext = createContext(undefined, undefined);

const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const fetchProduct = () => {
    try {
     
      const savedProducts = JSON.parse(localStorage.getItem('products'));
      if (savedProducts) {
        setProduct(savedProducts);
        setLoadingProduct(false);
      } else {
        
        setProduct([]);
        setLoadingProduct(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingProduct(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
      <ProductContext.Provider
          value={{
            product,
            loadingProduct,
            fetchProduct, 
          }}
      >
        {children}
      </ProductContext.Provider>
  );
};

export default ProductProvider;

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
