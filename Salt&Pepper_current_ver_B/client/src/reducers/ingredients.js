import { GET_ALL_INGREDIENTS, GET_INGREDIENT } from '../actions/types';

const initialState = {
  ingredient: null,
  ingredients: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_INGREDIENTS:
      return {
        ...state,
        ingredients: payload,
        loading: false
      };
    case GET_INGREDIENT:
      return {
        ...state,
        ingredient: payload,
        loading: false
      };

    default:
      return state;
  }
}
