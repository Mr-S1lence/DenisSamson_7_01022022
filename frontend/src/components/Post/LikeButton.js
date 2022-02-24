import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <div className="like-container">
      {uid && liked === false && (
        <FontAwesomeIcon
          icon={faHeart}
          size="lg"
          color="#FFD7D7"
          onClick={like}
        />
      )}
      {uid && liked === true && (
        <FontAwesomeIcon
          icon={faHeart}
          size="lg"
          color="#FD2D01"
          onClick={unlike}
        />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
