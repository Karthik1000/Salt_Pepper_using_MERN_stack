import axios from 'axios';
import { setAlert } from './alert';

import { POST_INFO, INFO_ERROR } from './types';

export const postInfo = (formData, history) => async dispatch => {
  try {
    console.log(formData);

    const info = {
      diet: formData.diet,
      mincal: formData.mincal,
      maxcal: formData.maxcal,
      token: formData.token
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/nutrition', info, config);

    dispatch({
      type: POST_INFO,
      payload: res.data
    });
    history.push('/output');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: INFO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
