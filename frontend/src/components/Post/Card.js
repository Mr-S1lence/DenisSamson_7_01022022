import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faSpinner,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "./../Utils";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  let deleteButton;
  if (userData._id === post.posterId || userData.status === 1) {
    deleteButton = <DeleteCard id={post._id} />;
  }

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      ) : (
        <>
          <div className="card">
            <div className="card-header">
              <div className="img-profil">
                <img
                  src={
                    !isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.picture;
                        else return null;
                      })
                      .join("") //entre chaque élément on mets des strings vide
                  }
                  alt="img profil"
                />
              </div>

              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.posterId)
                        return user.firstname + " " + user.lastname;
                      else return null;
                    })}
                </h3>
                <span>{dateParser(post.createdAt)}</span>
              </div>
            </div>
            <div className="card-content">
              {isUpdated === false && <p>{post.message}</p>}
              {isUpdated && (
                <div className="update-post">
                  <textarea
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="button-container">
                    <button className="btn" onClick={updateItem}>
                      Valider modification
                    </button>
                  </div>
                </div>
              )}
              {post.picture && (
                <img src={post.picture} alt="card-pic" className="card-pic" />
              )}
              {post.video && (
                <iframe
                  width="250"
                  height="150"
                  src={post.video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post._id}
                ></iframe>
              )}
            </div>
            <div className="card-footer">
              {userData._id === post.posterId && (
                <div className="button-card">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="lg"
                      color="#FD2D01"
                    />
                  </div>
                </div>
              )}
              <div>{deleteButton}</div>
              <div
                className="button-card"
                onClick={() => setShowComments(!showComments)}
              >
                <FontAwesomeIcon
                  icon={faCommentDots}
                  size="lg"
                  color="#FD2D01"
                />
                <span>{post.comments}</span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
