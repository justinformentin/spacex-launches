import {
  IS_LOGGED,
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
} from './actionTypes';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const saveUserStatus = status => ({
  type: IS_LOGGED,
  logged: status,
});

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/auth/signup', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const SetCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const loginUser = userData => dispatch => {
  axios
    .post('/api/auth/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(SetCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(SetCurrentUser({}));
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};
