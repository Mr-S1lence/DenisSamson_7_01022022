import { GET_COMMENTS, EDIT_COMMENT } from "../actions/comment.actions";

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
    default:
      return state;
  }
}
