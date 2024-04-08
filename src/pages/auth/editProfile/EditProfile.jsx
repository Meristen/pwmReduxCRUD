import React, { useEffect, useState } from "react";
import AuthForm from "../../../features/auth/AuthForm";
import Input from "../../../widgets/inputs/Input";
import Button from "../../../widgets/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editProfile,
  getCurrentUser,
} from "../../../store/users/users.actions";

const EditProfile = () => {
  const [user, setUser] = useState({
    profileImage: "",
    backgroundImage: "",
    username: "",
    password: "",
    email: "",
    description: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { users, currentUser } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getCurrentUser());

    if (currentUser) {
      setUser({
        profileImage: currentUser.profileImage,
        backgroundImage: currentUser.backgroundImage,
        username: currentUser.username,
        password: currentUser.password,
        email: currentUser.email,
        description: currentUser.description,
      });
    }
  }, [dispatch, currentUser]);

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

    if (user.password.length < 6) {
      alert("Password must be more than 6 symbols");
      return;
    }

    dispatch(editProfile({ user, id: currentUser.id }, dispatch));
    setUser({
      profileImage: "",
      backgroundImage: "",
      username: "",
      password: "",
      email: "",
      description: "",
    });
    navigate("/profile");
  }
  return (
    <div>
      <AuthForm>
        <form className="formStyles" onSubmit={handleSubmit}>
          <h2>Edit profile</h2>
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
            type="text"
          />

          <Input
            onChange={handleChange}
            name="email"
            value={user.email}
            type="email"
          />
          <Input
            onChange={handleChange}
            name="description"
            value={user.description}
            type="text"
          />

          <Input
            onChange={handleChange}
            name="profileImage"
            value={user.profileImage}
            type="url"
          />
          <Input
            onChange={handleChange}
            name="backgroundImage"
            value={user.backgroundImage}
            type="url"
          />
          <Button>Edit</Button>
        </form>
      </AuthForm>
    </div>
  );
};

export default EditProfile;
