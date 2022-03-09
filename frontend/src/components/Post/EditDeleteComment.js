import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, getComments } from "../../actions/comment.actions";
import { editComment } from "../../actions/comment.actions";
import { getPosts } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id))
    .then(() => dispatch(getPosts()))
    .then(() => dispatch(getComments(postId)));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);
  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <FontAwesomeIcon icon={faPenToSquare} size="lg" color="#FD2D01" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
{/*           <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          /> */}
          <textarea
          /* defaultValue={comment.text} */
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
          >{comment.text}</textarea>
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} size="lg" color="#FD2D01" />
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
