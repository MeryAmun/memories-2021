const express = require('express')
const router = express.Router()
const { signIn, signUp } = require('../controllers/authController.js')

router.post('/login', signIn)
router.post('/signup', signUp)
module.exports = router
