const asyncWrapper = require('./async')

const jwt = req('jsonwebtoken')

//wants to like a post? click the like button,> auth middleware checks is user has permission or authorization then runs next function
const authMiddleware = asyncWrapper((req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const isCustomAuth = token.length < 500

  let decodedData

  if (token && isCustomAuth) {
    decodedData = jwt.verify(token, process.env.SECRET_TOKEN_KEY)

    req.userId = decodedData?.id
  } else {
    decodedData = jwt.decode(token)
    req.userId = decodedData?.sub
  }
  next()
})

module.exports = authMiddleware
