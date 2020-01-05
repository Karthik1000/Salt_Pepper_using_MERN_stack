import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alerts';
import Dashboard from './components/dashboard/Dashboard';
import Options from './components/layout/Options';
import Profile from './components/Profile/EditProfile';
import myProfile from './components/Profile/myProfile';
import ProfileByID from './components/Profile/profileByID';
import Profiles from './components/profiles/Profiles';
import Upload from './components/Recipe/uploadRecipe';
import Recipe from './components/Recipe/Recipe';
import Bookmark from './components/bookmark/bookmark';
import myRecipes from './components/Recipe/myRecipes';
import Search_Recipes from './components/search/search_recipes';
import Search_Users from './components/search/search_users';
import Cart from './components/cart/cart';
import Paypal from './components/payment';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App1.css';
import Register_restaurant from './components/auth/Register_restaurant';
import Register_warehouse from './components/auth/Register_warehouse';
import Register_nutrition from './components/auth/Register_nutrition';
import PaymentPortal from './components/payments/PaymentPortal';

const alertOptions = {
  timeout: 7000,
  position: 'bottom right'
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Route exact path='/' component={Landing} />
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route
                exact
                path='/register_restaurant'
                component={Register_restaurant}
              />
              <Route
                exact
                path='/register_warehouse'
                component={Register_warehouse}
              />
              <Route
                exact
                path='/register_nutrition'
                component={Register_nutrition}
              />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/options' component={Options} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/profile/:id' component={ProfileByID} />
              <PrivateRoute exact path='/profiles' component={Profiles} />
              <PrivateRoute exact path='/uploadRecipe' component={Upload} />
              <PrivateRoute exact path='/myprofile' component={myProfile} />
              <PrivateRoute exact path='/bookmarks' component={Bookmark} />
              <PrivateRoute exact path='/myRecipes' component={myRecipes} />
              <PrivateRoute
                exact
                path='/searchRecipes'
                component={Search_Recipes}
              />
              <PrivateRoute
                exact
                path='/searchUsers'
                component={Search_Users}
              />
              <PrivateRoute exact path='/cart' component={Cart} />
              <PrivateRoute exact path='/payment/:amount' component={Paypal} />
              <PrivateRoute exact path='/recipe/:id' component={Recipe} />
              <PrivateRoute exact path='/pay' component={PaymentPortal} />
            </Switch>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
};

export default App;
