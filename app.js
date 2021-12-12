const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const connectDb = require('./db/connect')
const postRoute = require('./routes/postRoutes.js')

const app = express()
//routes
app.use('/posts', postRoute)
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors)

const port = process.env.PORT || 3500

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`we are live on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
