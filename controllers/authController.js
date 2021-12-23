import asyncWrapper from '../middleware/async'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

export const signIn = asyncWrapper(async (req, res, next) => {})

export const signUp = asyncWrapper(async (req, res, next) => {})
