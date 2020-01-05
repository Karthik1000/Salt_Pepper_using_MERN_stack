import { POST_RECIPE } from '../actions/types';

const initialState = {
  recipe: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_RECIPE:
      return {
        ...state,
        recipe: payload,
        loading: false
      };

    default:
      return state;
  }
}
