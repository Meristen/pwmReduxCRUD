import React, { useEffect, useState } from "react";
import "./profile.css";
import Card from "../../widgets/card/Card";
import { useDispatch } from "react-redux";
import { getOneUser, handleLike } from "../../store/users/users.actions";
import { useParams } from "react-router-dom";

const ProfilePage = ({ currentUser }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    id && dispatch(getOneUser(id));
  }, []);

  const [likedPosts, setLikesPosts] = useState(new Set());
  function toggleLike(postId) {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
      dispatch(handleLike({ user: currentUser, postId, operation: "minus" }));
    } else {
      newLikedPosts.add(postId);
      dispatch(handleLike({ user: currentUser, postId, operation: "plus" }));
    }
    setLikesPosts(newLikedPosts);
  }

  const [showComment, setShowComment] = useState(new Set());
  function toggleComment(postId) {
    const newComments = new Set(showComment);
    if (newComments.has(postId)) {
      newComments.delete(postId);
    } else {
      newComments.add(postId);
    }
    setShowComment(newComments);
  }

  return (
    <div className="profile-container">
      {currentUser && (
        <div className="profile">
          <div className="profile-header">
            <img
              className="background-image"
              src={currentUser.backgroundImage}
              alt=""
            />
            <img
              className="profile-image"
              src={currentUser.profileImage}
              alt=""
            />
            <h2 className="username">{currentUser.username}</h2>
            <p className="bio">My BIO: {currentUser.description}</p>
          </div>
          <div className="profile-posts">
            <h2 className="posts-title">My posts:</h2>
            <div className="posts-list">
              {currentUser.posts &&
                currentUser.posts.map((item) => (
                  <Card
                    toggleLike={toggleLike}
                    likedPosts={likedPosts}
                    showComment={showComment}
                    toggleComment={toggleComment}
                    item={item}
                    key={item.id}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
