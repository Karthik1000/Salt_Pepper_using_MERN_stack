import axios from 'axios';
import { setAlert } from './alert';

import { POST_ORDER, ORDER_ERROR, GET_PROFILE } from './types';

//Get cart

export const postOrder = (order, id, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(order);

    const res = await axios.post('/api/order', order, config);
    dispatch({
      type: POST_ORDER,
      payload: res.data
    });
    // const curr = await axios.post('/api/profile/id', id, config);
    // dispatch({
    //   type: GET_PROFILE,
    //   payload: curr.data
    // });
    history.push('/pay');
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
