import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";
import { addComment, getComments } from "../../actions/comment.actions";
import { getPosts } from "../../actions/post.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faArrowTurnRight, faArrowTurnUp, faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [loadComment, setLoadComment] = useState(true);
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.commentReducer);

  useEffect(() => {
    if (loadComment) {
      dispatch(getComments(post._id));
      setLoadComment(false);
    }
  }, [loadComment, dispatch, post]);

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => dispatch(getComments(post._id)))
        .then(() => setText(""));
    }
  };

  return (
    <div className="comments-container">
      {!isEmpty(comments[0]) &&
        comments.map((comment) => {
          if (post._id === comment.postId) {
            return (
              <div
                className={
                  comment.commenterId === userData._id
                    ? "comment-container client"
                    : "comment-container"
                }
                key={comment._id}
              >
                <div className="comment-header">
                <FontAwesomeIcon icon={faArrowTurnUp} size="lg" color="#FD2D01" />
                  <img
                    src={
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === comment.commenterId)
                            return user.picture;
                          else return null;
                        })
                        .join("") //entre chaque élément on mets des strings vide
                    }
                    alt="commenter-pic"
                  />
                  <div className="pseudo">
                    <h3>
                      {comment.firstname} {comment.lastname}
                    </h3>
                    <span>{dateParser(comment.createdAt)}</span>
                  </div>
                  
                </div>
                <p>{comment.text}</p>
                <EditDeleteComment comment={comment} postId={post._id} />
              </div>
            );
          } else {
            return null;
          }
        })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <br />
          <textarea
              name="text"
              placeholder="Laisser un commentaire"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
