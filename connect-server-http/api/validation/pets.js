const isEmpty = require('./is-empty')
const Validator = require('validator')

module.exports = function validateAddPetInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.gender = !isEmpty(data.gender) ? data.gender : ''
    data.years = !isEmpty(data.years) ? data.years : ''
    data.pciture = !isEmpty(data.pciture) ? data.pciture : ''
    data.breed = !isEmpty(data.breed) ? data.breed : ''

    if (!Validator.isLength(data.name, { min: 2, max: 100 })) {
        errors.name = 'Name must be between 2 and 100 symbols'
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    if (data.gender !== 'Female' && data.gender !== 'Male') {
        errors.gender = 'Gender must be Male or Female!'
    }
    if (Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender field is required'
    }

    if (!Validator.isInt(data.years)) {
        errors.years = 'Years must be a number!'
    }
    if (Validator.isEmpty(data.years)) {
        errors.years = 'Years field is required'
    }

    if (!Validator.isLength(data.picture, { min: 5, max: 300 })) {
        errors.picture = 'Picture url must be between 5 and 300 symbols'
    }
    if (Validator.isEmpty(data.picture)) {
        errors.picture = 'Picture field is required'
    }

    if (!Validator.isLength(data.breed, { min: 2, max: 200 })) {
        errors.breed = 'Breed must be between 2 and 100 symbols'
    }
    if (Validator.isEmpty(data.breed)) {
        errors.breed = 'Breed field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
