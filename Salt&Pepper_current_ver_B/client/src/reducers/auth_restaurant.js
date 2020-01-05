import {
  REGISTER_RESTAURANT_SUCCESS,
  REGISTER_RESTAURANT_FAIL,
  RESTAURANT_LOADED,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  restaurant: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESTAURANT_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        restaurant: payload
      };
    case REGISTER_RESTAURANT_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_RESTAURANT_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
}
