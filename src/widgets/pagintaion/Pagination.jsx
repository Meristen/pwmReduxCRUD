import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../../store/products/products.slice";
import { getProducts } from "../../store/products/products.actions";

const Pagination = () => {
  const { currentPage, lastPage } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const decrement = () => {
    dispatch(prevPage());
    dispatch(getProducts());
  };

  const increment = () => {
    dispatch(nextPage());
    dispatch(getProducts());
  };

  return (
    <div>
      {currentPage !== 1 && <button onClick={decrement}>Previous</button>}
      <span>{currentPage}</span>
      {!lastPage && <button onClick={increment}>Next</button>}
    </div>
  );
};

export default Pagination;
