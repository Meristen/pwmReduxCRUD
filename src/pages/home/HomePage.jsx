import React, { useEffect } from "react";
import ProductCard from "../../widgets/productCard/ProductCard";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/products/products.actions";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hello");
    dispatch(getProducts());
  }, [dispatch]);
  return <ProductCard />;
};

export default HomePage;
