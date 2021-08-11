const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const genres = require('./route/genres')
const customers =require('./route/customers')
const movies = require('./route/movies')
const rentals =require('./route/rentals')
const users = require('./route/users')
const auths = require('./route/auth')
const express = require('express')
const app = express()

if(!config.get('jwtPrivateKey')) {
    console.log("FATAL ERROR: jwtPrivateKey is not defined")
    process.exit(1)
}

mongoose_uri = 'mongodb+srv://admin:1234@kulthawat.vack3.mongodb.net/Aum?retryWrites=true&w=majority'

mongoose.connect(mongoose_uri)
    .then(() => console.log('Connected to database...'))
    .catch(() => console.log('Cannot connect to database'))

    
app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auths', auths)

const port = process.env.PORT||3000
app.listen(port, () => console.log(`Listening to PORT ${port}...`))