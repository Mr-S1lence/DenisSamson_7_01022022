import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => {
      dispatch(deletePost(props.id))
  };
  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?"))
          deleteQuote();
      }}
    >
      <FontAwesomeIcon icon={faTrashCan} size="lg" color="#FD2D01" />
    </div>
  );
};

export default DeleteCard;
