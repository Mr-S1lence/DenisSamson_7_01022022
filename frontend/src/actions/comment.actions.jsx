import axios from "axios";

//comments
export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getComments = (postId) => {
  return (dispatch) => {
    return axios
      .get(`${import.meta.env.VITE_API_URL}/api/comment/${postId}`)
      .then((res) => {
        dispatch({ type: GET_COMMENTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/api/comment/${postId}`,
      data: { commenterId, text, commenterPseudo },
    })
      .then(() => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}/api/comment/edit-comment/`,
      data: { commentId, text },
    })
      .then(() => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${
        import.meta.env.VITE_API_URL
      }/api/comment/delete-comment-post/${commentId}`,
      data: { commentId },
    })
      .then(() => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};
