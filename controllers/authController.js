const asyncWrapper = require('../middleware/async')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const signIn = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body
  const existingUser = await User.findOne({ email })

  if (!existingUser)
    return res.status(404).json({ message: "User doesn't exist" })
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  )
  if (!isPasswordCorrect)
    return res.status(400).json({ message: 'Invalid credentials' })

  const token = jwt.sign(
    { email: existingUser.email, id: existingUser._id },
    'memoriesToken123567',
    { expiresIn: '3h' }
  )
  res.status(200).json({ result: existingUser, token })
})

const signUp = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body
  const existingUser = await User.findOne({ email })
  if (existingUser)
    return res.status(400).json({ message: 'User already exists' })
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords don't match" })
  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = await User.create({
    email,
    password: hashedPassword,
    name: `${firstName}  ${lastName}`,
  })
  const token = jwt.sign(
    { email: newUser.email, id: newUser._id },
    'memoriesToken123567',
    { expiresIn: '3h' }
  )
  res.status(200).json({ newUser, token })
})
module.exports = { signIn, signUp }
