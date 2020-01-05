import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_ALL_INGREDIENTS,
  INGREDIENTS_ERROR,
  GET_INGREDIENT
} from './types';

//Get all ingredients
export const getIngredients = () => async dispatch => {
  try {
    const res = await axios.get('/api/ingredients');

    dispatch({
      type: GET_ALL_INGREDIENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INGREDIENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const postIngredient = data => async dispatch => {
  try {
    console.log(data);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/ingredients', data, config);

    dispatch({
      type: GET_INGREDIENT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: INGREDIENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
