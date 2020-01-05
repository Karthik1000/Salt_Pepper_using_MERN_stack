import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_WAREHOUSE_SUCCESS,
  REGISTER_WAREHOUSE_FAIL,
  WAREHOUSE_LOADED,
  AUTH_ERROR
} from './types';

import setAuthToken from '../utils/setAuthToken';
//Load User
// export const loadUser = () => async dispatch => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get('/api/restaurant');

//     dispatch({
//       type: RESTAURANT_LOADED,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR
//     });
//   }
// };

//Register User

export const register = ({
  name,
  email,
  password,
  locality,
  city,
  pincode
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    name,
    email,
    password,
    locality,
    city,
    pincode,
    user_type: 'warehouse'
  });

  try {
    const res = await axios.post('/api/warehouse', body, config);

    dispatch({
      type: REGISTER_WAREHOUSE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_WAREHOUSE_FAIL
    });
  }
};
