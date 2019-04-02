const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Schema
const AnimalSchema = new Schema({
  picture: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  years: {
    type: String,
    required: true
  }
})

module.exports = Animal = mongoose.model('animals', AnimalSchema)
