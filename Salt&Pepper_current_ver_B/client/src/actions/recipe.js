import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_ALL_RECIPES,
  RECIPE_ERROR,
  POST_RECIPE,
  GET_MY_RECIPES,
  GET_ID_RECIPES,
  DELETE_RECIPE,
  GET_RECIPE
} from './types';

//Get all recipes

export const getAllRecipes = () => async dispatch => {
  try {
    const res = await axios.get('/api/recipes');

    dispatch({
      type: GET_ALL_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getMyRecipes = id => async dispatch => {
  try {
    const res = await axios.get(`/api/recipes/recipe/${id}`);
    console.log(id);
    dispatch({
      type: GET_MY_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getRecipesByUserID = id => async dispatch => {
  try {
    const res = await axios.get(`/api/recipes/recipe/others/${id}`);
    console.log(id);
    dispatch({
      type: GET_ID_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getRecipe = id => async dispatch => {
  try {
    const res = await axios.get(`/api/recipes/${id}`);
    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const postRecipe = formData => async dispatch => {
  try {
    console.log(formData);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/recipes', formData, config);
    dispatch(setAlert('Recipe Uploaded', 'success'));

    dispatch({
      type: POST_RECIPE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteRecipe = id => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete(`/api/recipes/${id}`);

      dispatch({
        type: DELETE_RECIPE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
