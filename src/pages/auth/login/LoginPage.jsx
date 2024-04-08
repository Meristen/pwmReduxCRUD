import React, { useEffect, useState } from "react";
import styles from "../auth.module.css";
import AuthForm from "../../../features/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUsers } from "../../../store/users/users.actions";
import Input from "../../../widgets/inputs/Input";
import Button from "../../../widgets/buttons/Button";

const LoginPage = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.users);
  //   console.log(users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  function handleChange(e) {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    for (let key in user) {
      if (!user[key]) {
        alert("Some inputs are empty!");
        return;
      }
    }

    const userObj = await users.find((item) => item.username === user.username);
    // console.log(userObj);
    if (!userObj) {
      alert("User not found!");
      return;
    }

    if (user.password !== userObj.password) {
      alert("Wrong password");
      return;
    }

    setUser({
      username: "",
      password: "",
    });
    localStorage.setItem("currentUser", userObj.id);
    navigate("/");
    dispatch(getCurrentUser(userObj.id));
    // console.log(user);
  }
  return (
    <div>
      <AuthForm>
        <form className="formStyles" onSubmit={handleSubmit}>
          <h2>Login form</h2>
          <Input
            onChange={handleChange}
            name="username"
            value={user.username}
            type="text"
          />
          <Input
            onChange={handleChange}
            name="password"
            value={user.password}
            type="password"
          />
          <Button>Sign in</Button>
        </form>
      </AuthForm>
    </div>
  );
};

export default LoginPage;
