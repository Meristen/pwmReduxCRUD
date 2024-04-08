import React from "react";
import styles from "./auth.module.css";

const AuthForm = ({ children }) => {
  return <div className={styles.style}>{children}</div>;
};

export default AuthForm;
