import axios from 'axios';
import { setAlert } from './alert';

import { BOOKMARK_ERROR, BOOKMARK } from './types';

//Get cart

export const Bookmark = recipe => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile/bookmark', recipe, config);

    dispatch({
      type: BOOKMARK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOOKMARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
