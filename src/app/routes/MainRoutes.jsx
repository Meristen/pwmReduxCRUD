import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import RegisterPage from "../../pages/auth/register/RegisterPage";
import LoginPage from "../../pages/auth/login/LoginPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import AuthProvider from "./AuthProvider";
import CreatePost from "../../features/post/CreatePost";
import UsersPage from "../../pages/users/UsersPage";
import { useSelector } from "react-redux";
import EditProfile from "../../pages/auth/editProfile/EditProfile";
import AddProduct from "../../pages/products/add/AddProduct";
import EditProduct from "../../pages/products/edit/EditProduct";
import Description from "../../pages/description/Description";

const MainRoutes = () => {
  const { currentUser, oneUser } = useSelector((state) => state.users);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user/:id" element={<ProfilePage currentUser={oneUser} />} />
      <Route element={<AuthProvider />}>
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route
          path="/profile"
          element={<ProfilePage currentUser={currentUser} />}
        />
        <Route path="/description-card" element={<Description />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/create-product" element={<AddProduct />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
