import axios from 'axios';
import { setAlert } from './alert';

import { POST_RECIPE, RECIPE_ERROR } from './types';

export const postRecipe = formData => async dispatch => {
  try {
    console.log(formData);

    const recipe = {
      title: formData.title,
      description: formData.description,
      cuisine: formData.cuisine,
      images: formData.images
    };
    const data = {
      token: formData.token,
      recipe: recipe
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/restaurant', data, config);
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
