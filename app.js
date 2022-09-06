const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const connectDb = require('./db/connect')
const postRoute = require('./routes/postRoutes.js')
const authRoutes = require('./routes/authRoutes')

const app = express()
//wew must always place app.use(cors) middleware above the routes.

//middleware
// app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true }))
//app.use(cors)

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
app.use('/user', authRoutes)

app.get('/user', (req, res) => {
  res.send('Hello welcome to users section')
})

app.get('/', (req, res) => {
  res.send('Hello and welcome to Memories API')
})

let PORT = process.env.PORT
const host = '0.0.0.0'

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URL).then(() => {
      if (PORT == null || PORT == '') {
        PORT = 8000
      }
      app.listen(PORT, host, () => {
        console.log(`we are live on port ${PORT}`)
      })
    })
  } catch (error) {
    console.log(error)
  }
}
startServer()

// const PORT = process.env.PORT || 5000
// const host = '0.0.0.0'
// const startServer = async () => {
//   try {
//     await connectDb(process.env.MONGO_URL).then(() =>
//       app.listen(PORT, host, () => {
//         console.log(`we are live on port ${PORT}`)
//       })
//     )
//   } catch (error) {
//     console.log(error)
//   }
// }

// startServer()
