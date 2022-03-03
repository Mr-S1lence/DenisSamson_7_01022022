import axios from "axios";

//posts
export const GET_COMMENTS = "GET_COMMENTS";

export const getComments = (postId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/comment/${postId}`)
      .then((res) => {
        dispatch({ type: GET_COMMENTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
