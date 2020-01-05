import { GET_CART, ADD_TO_CART } from '../actions/types';

const initialState = {
  cart: [],
  total: 1,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: payload,
        loading: false
      };
    default:
      return state;
  }
}
