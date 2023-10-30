//imports
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const registerRoute = require('./Routes/registerRoute');
const loginRoute = require('./Routes/loginRoute')
const taskRoute=require('./Routes/taskRoute')

//Express obj

const app = express()

//Database_connection

mongoose.connect("mongodb://127.0.0.1:27017/Todo")

//middlewares

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

//routes

app.use('/', registerRoute)
app.use('/', loginRoute)
app.use('/',taskRoute)

//globals

const port = process.env.PORT

//listing the server

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})