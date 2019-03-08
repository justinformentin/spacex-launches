import { combineReducers } from 'redux';
import { userRelated } from './userRelated';
import authUser from './authReducer';
import errors from './errorReducer';

const rootReducer = combineReducers({
  user: userRelated,
  userAuth: authUser,
  errors,
});

export default rootReducer;
