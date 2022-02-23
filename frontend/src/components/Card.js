import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faSpinner,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "./Utils";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                  })
                  .join("") //entre chaque élément on des strings vide
              }
              alt="img profil"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.posterId) return user.pseudo;
                    })}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            <p>{post.message}</p>
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <FontAwesomeIcon
                  icon={faCommentDots}
                  size="lg"
                  color="#FD2D01"
                />
                <span>{post.comments.length}</span>
              </div>
              <FontAwesomeIcon icon={faThumbsUp} size="lg" color="#FD2D01" />
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
