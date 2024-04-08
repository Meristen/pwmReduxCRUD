import React, { useState } from "react";
import Input from "../../widgets/inputs/Input";
import Button from "../../widgets/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/users/users.actions";
import { useNavigate } from "react-router-dom";
import AuthForm from "../auth/AuthForm";

const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.users);
  const [post, setPost] = useState({
    title: "",
    image: "",
    description: "",
    id: Date.now(),
    likes: 0,
    comments: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  function onSubmit(e) {
    e.preventDefault();
    if (!post.title.trim() || !post.description.trim() || !post.image.trim()) {
      alert("Some inputs are empty!");
      return;
    }
    dispatch(createPost({ user: currentUser, post }, dispatch));
    setPost({
      title: "",
      image: "",
      description: "",
      id: Date.now(),
      likes: 0,
      comments: [],
    });
    navigate("/profile");
    console.log(post);
  }

  return (
    <AuthForm>
      <form className="formStyles" onSubmit={onSubmit}>
        <h2>Create post</h2>
        <Input onChange={handleChange} value={post.title} name={"title"} />
        <Input
          onChange={handleChange}
          value={post.description}
          name={"description"}
        />
        <Input onChange={handleChange} value={post.image} name={"image"} />
        <Button>Add post</Button>
      </form>
    </AuthForm>
  );
};

export default CreatePost;
