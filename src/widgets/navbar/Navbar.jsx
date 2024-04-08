import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import image from "../../foto/image.png";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/users/users.actions";
import { logout } from "../../store/users/users.slice";
import Button from "../buttons/Button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const [user, setUser] = useState({
    profileImage: image,
    username: "",
  });

  useEffect(() => {
    let handler = () => {
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);

    const id = localStorage.getItem("currentUser");
    if (id) {
      dispatch(getCurrentUser(id));
    }
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.profileImage) {
      setUser(currentUser);
    } else {
      setUser({
        profileImage: image,
        username: "",
      });
    }
  }, [currentUser]);
  return (
    <div className={styles.navbar}>
      <Link className={styles.logo} to="/">
        <h2>G-Evening</h2>
      </Link>
      <div className={styles.navbarUser}>
        {currentUser && currentUser.email === "admin@gmail.com" && (
          <Link to="/create-product">
            <Button style={{ color: "white" }} color="green">
              Create product
            </Button>
          </Link>
        )}
        <Link to="/users">
          <Button style={{ color: "white" }} color="blue">
            Users
          </Button>
        </Link>
        {currentUser && (
          <Link to="/create-post">
            <Button style={{ color: "white" }} color="green">
              Create post
            </Button>
          </Link>
        )}
        {currentUser && (
          <Link to="/edit-profile">
            <Button style={{ color: "white" }}>Edit profile</Button>
          </Link>
        )}
        {/* <Button /> */}
        <Link to="/profile">{user.username}</Link>
      </div>
      <div className="navImage">
        <img
          alt=""
          onClick={() => setOpen(!open)}
          src={
            currentUser && currentUser.profileImage
              ? currentUser.profileImage
              : image
          }
        />
      </div>

      <div className={`navMenu ${open ? "active" : ""}`}>
        {currentUser ? (
          <div>
            <Link to="/profile">My profile</Link>
            <p onClick={() => dispatch(logout())}>Logout</p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
          >
            <Link to="/register">Sign up</Link>
            <Link to="/login">Sign in</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
