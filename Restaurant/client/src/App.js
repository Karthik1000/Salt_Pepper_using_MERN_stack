import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import Alert from './components/Alerts';

import Upload from './components/Recipe';

//Redux
import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';

// import './App1.css';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const alertOptions = {
  timeout: 7000,
  position: 'bottom right'
};

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Alert />
            <Route exact path='/' component={Upload} />
            {/* <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route
              exact
              path='/register_restaurant'
              component={Register_restaurant}
            />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/options' component={Options} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/profiles' component={Profiles} />
            <PrivateRoute exact path='/uploadRecipe' component={Upload} />
            <PrivateRoute exact path='/myprofile' component={myProfile} />
            <PrivateRoute exact path='/myRecipes' component={myRecipes} />
            <PrivateRoute exact path='/cart' component={Cart} />
            <PrivateRoute exact path='/payment' component={Paypal} />
            <PrivateRoute exact path='/recipe/:id' component={Recipe} />
          </Switch> */}
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
};

export default App;
