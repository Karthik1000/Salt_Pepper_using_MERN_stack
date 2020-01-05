import { GET_QUANTITY } from "../actions/types";

const initialState = {
  recipe_array: [],
  quantity: null,
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_QUANTITY:
      return {
        ...state,
        quantity: payload,
        loading: false
      };
    default:
      return state;
  }
}
