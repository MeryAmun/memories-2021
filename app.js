const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const connectDb = require('./db/connect')

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to memories lane',
  })
})

const port = 3500

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
