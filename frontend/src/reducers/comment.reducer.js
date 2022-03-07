import {
  GET_COMMENTS,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../actions/comment.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;
    case EDIT_COMMENT:
      return state.map((comment) => {
        if (comment._id === action.payload.commentId) {
          return {
            ...comment,
            text: action.payload.text,
          };
        } else {
          return comment;
        }
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        //Une recherche pour trouver le post
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    default:
      return state;
  }
}
