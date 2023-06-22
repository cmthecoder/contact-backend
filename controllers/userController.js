const asyncHandler = require('express-async-handler')
// Import bycrpt
const bcrpt = require('bcrypt')
// Import the model
const User = require('../models/userModel')

// Register a user
// POST /api/users/register
// access public

const registerUser = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body

  if(!username || !email || !password) {
    res.status(400)
    throw new Error('All fields are required')
  }

  const userAvailable  = await User.findOne({email})

  if(userAvailable) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash pasword
  const hashedPassword = await bcrpt.hash(password, 10)

  // Create a new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  console.log(`User created ${user}`);

  if(user) {
    res.status(201).json({_id: user.id, email: user.email})
  } else {
    res.status(400)
    throw new Error('User data is not valid')
  }
  res.json({ message: 'Register the user'})
})

// Login user
// POST /api/users/login
// access public

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Login the user'})
})


// Current user info
// POST /api/users/current
// access private

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Current user information'})
})

module.exports = {registerUser, loginUser, currentUser}