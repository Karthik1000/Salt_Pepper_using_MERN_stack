import { BOOKMARK, BOOKMARK_ERROR } from '../actions/types';

const initialState = {
  bookmark: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BOOKMARK:
      return {
        ...state,
        bookmark: payload,
        loading: false
      };
    default:
      return state;
  }
}
