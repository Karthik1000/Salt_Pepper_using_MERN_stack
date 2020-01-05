import { combineReducers } from 'redux';

import recipe from './recipe';
import messages from './messages';
import errors from './errors';

export default combineReducers({
  recipe,
  messages,
  errors
});
