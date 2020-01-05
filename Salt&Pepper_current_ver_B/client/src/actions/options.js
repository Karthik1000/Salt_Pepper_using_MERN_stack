import axios from 'axios';
import { setAlert } from './alert';

import { GET_OPTIONS, POST_OPTIONS, OPTIONS_ERROR } from './types';
import { routerMiddleware, push, browserHistory } from 'react-router-redux';
//Get options
export const getOptions = () => async dispatch => {
  try {
    const res = await axios.get('api/cuisine');

    dispatch({
      type: GET_OPTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: OPTIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Post options
export const postOptions = selected_cuisines => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log(selected_cuisines);

  try {
    const res = await axios.post('api/cuisine', selected_cuisines, config);

    dispatch({
      type: POST_OPTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: OPTIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
