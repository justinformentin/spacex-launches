const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateUserRegister(data){

  let error = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(Validator.isEmpty(data.name)){
    error.name = "Name cannot be empty"
  }

  if(Validator.isEmpty(data.email)){
    error.email = "Email cannot be empty"
  }else if(!Validator.isEmail(data.email)){
    error.email = "Email not in correct form"
  }

  if(Validator.isEmpty(data.password)){
    error.password = "Password cannot be empty"
  }

  if(!Validator.isLength(data.password, {min: 6, max: 30})){
    error.password = "Password must be between 6 and 30 characters"
  }

  return{
    error,
		isValid: isEmpty(error),
  }
}