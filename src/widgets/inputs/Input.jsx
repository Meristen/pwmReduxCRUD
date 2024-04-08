import React from "react";
import styles from "./input.module.css";

const Input = ({ value, onChange, type, name }) => {
  return (
    <div className={styles.inputGroup}>
      <input onChange={onChange} name={name} value={value} type={type} />
      <label htmlFor="name">{name}</label>
    </div>
  );
};

export default Input;
