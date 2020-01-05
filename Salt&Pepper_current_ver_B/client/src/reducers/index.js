import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import options from './options';
import profile from './profile';
import recipe from './recipe';
import cart from './cart';
import ingredients from './ingredients';
import warehouse from './warehouse';
import auth_restaurant from './auth_restaurant';
import auth_warehouse from './auth_warehouse';
import messages from './messages';
import errors from './errors';
import auth_nutritionist from './auth_nutritionist';
import order from './order';
import bookmark from './bookmark';
import resrecipe from './resrecipe';

export default combineReducers({
  alert,
  auth,
  options,
  profile,
  recipe,
  cart,
  ingredients,
  warehouse,
  auth_restaurant,
  auth_warehouse,
  auth_nutritionist,
  messages,
  errors,
  order,
  bookmark,
  resrecipe
});
