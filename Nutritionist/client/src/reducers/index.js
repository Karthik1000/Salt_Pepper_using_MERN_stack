import { combineReducers } from 'redux';

import nutritionist from './nutritionist';
import errors from './errors';
import messages from './messages';

export default combineReducers({
  nutritionist,
  errors,
  messages
});
