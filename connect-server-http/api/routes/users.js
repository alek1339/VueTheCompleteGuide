const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const keys = require('../keys')

const validateRegisterInput = require('../validation/register')

// TEST
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))

// Register User
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json('Email already exists!')
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

router.post('/login', (req, res) => {
  console.log(req.body)

  const email = req.body.email
  const password = req.body.password
  // Find the user by email
  User.findOne({ email: email })
    .then(user => {
      // Check for user
      if (!user) {
        return res.status(404).json('User not found')
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User Matched

            const payload = { id: user.id, name: user.name } // Create JWT payload

            // Sign Token
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 86000 }, (err, token) => {
              res.json(token)
            })
          } else {
            res.status(400).json('Password incorrect')
          }
        })
    })
})

module.exports = router
