import {
  REGISTER_NUTRITION_SUCCESS,
  REGISTER_NUTRITION_FAIL,
  NUTRITION_LOADED,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  nutritionist: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NUTRITION_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        nutritionist: payload
      };
    case REGISTER_NUTRITION_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_NUTRITION_FAIL:
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
