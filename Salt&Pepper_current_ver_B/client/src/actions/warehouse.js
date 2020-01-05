import axios from 'axios';
import { setAlert } from './alert';

import { GET_QUANTITY, QUANTITY_ERROR, GET_RECIPE } from './types';

export const getQuantity = body => async dispatch => {
  //   console.log(id);
  try {
    const res = await axios.get(`/api/warehouse/recipe/${body}`);
    const curr = await axios.get(`/api/recipes/${body}`);

    dispatch({
      type: GET_QUANTITY,
      payload: res.data
    });
    dispatch({
      type: GET_RECIPE,
      payload: curr.data
    });
  } catch (err) {
    dispatch({
      type: QUANTITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const postQuantity = body => async dispatch => {
  console.log(body);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/warehouse', body, config);
    //const curr = await axios.post('/api/warehouse/quantity', body, config);

    // dispatch({
    //   type: GET_QUANTITY,
    //   payload: curr.data
    // });
    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: QUANTITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
