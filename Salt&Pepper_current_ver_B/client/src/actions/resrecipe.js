import axios from 'axios';
import { setAlert } from './alert';

import { GET_ALL_RES_RECIPES, RES_RECIPE_ERROR } from './types';

//Get all recipes

export const getAllResRecipes = () => async dispatch => {
  try {
    const res = await axios.get('/api/resrecipes');

    dispatch({
      type: GET_ALL_RES_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RES_RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
