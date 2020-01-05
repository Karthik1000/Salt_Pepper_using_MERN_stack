import { POST_INFO } from '../actions/types';

const initialState = {
  recipes: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_INFO:
      return {
        ...state,
        recipes: payload,
        loading: false
      };

    default:
      return state;
  }
}
