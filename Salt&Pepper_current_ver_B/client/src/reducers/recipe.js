import {
  GET_ALL_RECIPES,
  POST_RECIPE,
  GET_MY_RECIPES,
  GET_ID_RECIPES,
  DELETE_RECIPE,
  GET_RECIPE
} from '../actions/types';

const initialState = {
  recipe: null,
  recipes: [],
  myrecipes: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: payload,
        loading: false
      };
    case GET_MY_RECIPES:
      return {
        ...state,
        myrecipes: payload,
        loading: false
      };
    case GET_ID_RECIPES:
      return {
        ...state,
        recipes: payload,
        loading: false
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: payload,
        loading: false
      };
    case POST_RECIPE:
      return {
        ...state,
        recipe: payload,
        loading: false
      };
    case DELETE_RECIPE:
      return {
        ...state,
        myrecipes: state.myrecipes.filter(recipe => recipe.id !== payload)
      };
    default:
      return state;
  }
}
