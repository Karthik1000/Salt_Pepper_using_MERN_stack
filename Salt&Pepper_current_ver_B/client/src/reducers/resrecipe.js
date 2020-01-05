import { GET_ALL_RES_RECIPES } from '../actions/types';

const initialState = {
  resrecipes: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_RES_RECIPES:
      return {
        ...state,
        resrecipes: payload,
        loading: false
      };

    default:
      return state;
  }
}
