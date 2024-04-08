import React, { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/users/users.actions";

const Card = ({ item, toggleLike, likedPosts, showComment, toggleComment }) => {
  const [comment, setComment] = useState("");
  const { currentUser, oneUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <div className="post" key={item.id}>
      <img
        onClick={() => console.log(item)}
        className="post-image"
        src={item.image}
        alt=""
      />
      {currentUser && (
        <div onClick={() => toggleLike(item.id)}>
          {likedPosts.has(item.id) ? (
            <FcLike size={25} />
          ) : (
            <FcLikePlaceholder size={25} />
          )}
        </div>
      )}
      <p>Likes: {item.likes}</p>
      <div className="post-details">
        <h3 className="post-title">{item.title}</h3>
        <p className="post-description">{item.description}</p>
        <div>
          Comments:
          {item.comments.map((item, index) => (
            <div key={index}>
              <b>{item.author}:</b> {item.comment}
            </div>
          ))}
        </div>
        <div>
          {showComment.has(item.id) && (
            <Input
              name="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          )}
        </div>
        {currentUser && (
          <Button
            onClick={() => {
              if (comment) {
                dispatch(
                  createComment({
                    user: oneUser,
                    postId: item.id,
                    author: currentUser.username,
                    comment,
                  })
                );
                setComment("");
              }
              toggleComment(item.id);
            }}
          >
            {showComment.has(item.id) ? "Send" : "Comment"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
