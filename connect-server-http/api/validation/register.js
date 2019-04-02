const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput (data) {
  let errors = {}

  data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
  data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
  data.username = !isEmpty(data.username) ? data.username : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = 'First Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'First Name field is required'
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = 'Last Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name field is required'
  }

  if (!Validator.isLength(data.username, { min: 3, max: 50 })) {
    errors.username = 'Username must be between 3 and 50 characters'
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.name = 'Password must be between 6 and 30 characters'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password = 'Confirm password field is required'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
