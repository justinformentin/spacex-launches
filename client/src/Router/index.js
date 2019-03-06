import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import jwt_decode from "jwt-decode";
import setAuthToken from '../utils/setAuthToken';
import { SetCurrentUser, logoutUser } from "../store/actions/actions";
import Info from '../Info';
import SavedContainer from '../Saved';
import LaunchContainer from '../Launches';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import store from '../store';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(SetCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./login";
    }
  }

const Routing = () => (
    <Provider store={store}>
    <ToastContainer />
        <Router>
            <Switch>
                <Route exact path="/" component={LaunchContainer} />
                <Route exact path="/saved" component={SavedContainer} />
                <Route exact path="/launch/:flight_number" component={Info} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Switch>
        </Router>
    </Provider>
)

export default Routing;