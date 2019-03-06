const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateUserLogin(data){

  let error = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(Validator.isEmpty(data.email)){
    error.email = "Email cannot be empty"
  }else if(!Validator.isEmail(data.email)){
    error.email = "Email is not in the correct format"
  }

  if(Validator.isEmpty(data.password)){
    error.password = "Password cannot be empty"
  }

  return{
    error,
    isValid: isEmpty(error),
  }
}