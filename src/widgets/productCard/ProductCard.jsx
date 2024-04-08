import React, { useEffect, useState } from "react";
import styles from "./productCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
} from "../../store/products/products.actions";
import Button from "../../widgets/buttons/Button";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../loader/Loader";
import Input from "../inputs/Input";
import Pagination from "../pagintaion/Pagination";

const ProductsCard = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    console.log(currentParams);
    setSearchParams({ ...currentParams, q: searchVal });
  }, [searchVal]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(getProducts(searchVal));
        }}
      >
        <Input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          name="Search"
        />
      </form>
      <div className={styles.cardList}>
        {(loading || error) && <Loader />}
        {products.map((item) => (
          <div key={item.id} className={styles.card}>
            <img onClick={() => console.log(item)} src={item.image} alt="" />
            <h2>{item.title}</h2>
            <h3>{item.price}$</h3>
            <p>{item.description}</p>
            <Link to={`/edit-product/${item.id}`}>
              <Button color="blue">edit</Button>
            </Link>
            <Button
              onClick={() => dispatch(deleteProduct(item.id))}
              color="red"
            >
              delete
            </Button>
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default ProductsCard;
