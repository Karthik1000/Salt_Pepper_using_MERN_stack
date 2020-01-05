import { GET_OPTIONS, POST_OPTIONS, OPTIONS_ERROR } from '../actions/types';

const initialState = {
  options: [],
  postsuccess: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OPTIONS:
      return {
        ...state,
        options: payload,
        postsuccess: false,
        loading: false
      };
    case POST_OPTIONS:
      return {
        ...state,
        ...payload,
        postsuccess: true,
        loading: false
      };
    case OPTIONS_ERROR:
      return {
        ...state,
        error: payload,
        postsuccess: false,
        loading: false
      };
    default:
      return state;
  }
}
