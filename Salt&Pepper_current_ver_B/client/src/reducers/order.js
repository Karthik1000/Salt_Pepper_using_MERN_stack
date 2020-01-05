import { POST_ORDER, ORDER_ERROR } from '../actions/types';

const initialState = {
  order: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_ORDER:
      return {
        ...state,
        order: payload,
        loading: false
      };

    default:
      return state;
  }
}
