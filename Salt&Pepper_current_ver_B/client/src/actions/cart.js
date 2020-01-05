import axios from 'axios';
import { setAlert } from './alert';

import { CART_ERROR, ADD_TO_CART } from './types';

//Get cart

export const AddToCart = recipe => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile/cart', recipe, config);

    dispatch({
      type: ADD_TO_CART,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
