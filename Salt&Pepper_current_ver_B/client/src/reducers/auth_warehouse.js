import {
  REGISTER_WAREHOUSE_SUCCESS,
  REGISTER_WAREHOUSE_FAIL,
  WAREHOUSE_LOADED,
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
    case WAREHOUSE_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        restaurant: payload
      };
    case REGISTER_WAREHOUSE_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_WAREHOUSE_FAIL:
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
