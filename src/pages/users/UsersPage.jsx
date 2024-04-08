import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/users/users.actions";
import { Link } from "react-router-dom";
import styles from "./user.module.css";
const UsersPage = () => {
  const { users, currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div className={styles.userContent}>
      {users
        .filter((user) => {
          if (currentUser) {
            return user.id !== currentUser.id;
          } else {
            return user;
          }
        })
        .map((item) => (
          <Link className={styles.link} key={item.id} to={`/user/${item.id}`}>
            <div className={styles.usersCard}>
              <img src={item.profileImage} className={styles.img} alt="" />
              <h3>{item.username}</h3>
              <p>{item.email}</p>
              <p>{item.password}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default UsersPage;
