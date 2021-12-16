const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const connectDb = require('./db/connect')
const postRoute = require('./routes/postRoutes.js')

const app = express()
//wew must always place app.use(cors) middleware above the routes.
// app.use(cors)
//middleware
// app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

//routes
app.use('/posts', postRoute)

app.get('/', (req, res) => {
  res.send('Hello and welcome to Memories API')
})

const PORT = process.env.PORT || 5000
const host = '0.0.0.0'
const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URL).then(() =>
      app.listen(PORT, host, () => {
        console.log(`we are live on port ${PORT}`)
      })
    )
  } catch (error) {
    console.log(error)
  }
}

startServer()
