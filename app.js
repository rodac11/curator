const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const logger = require('./utils/logger')
//const middleware = require('./utils/middleware')
const linksRouter = require('.controllers/links')

const app = express()

//TODO: REFACTOR INTO DIFFERENT FILES
//TODO: ADD MIDDLEWARE FOR LOGGING AND ENDPOINTS

logger.info('connecting to', config.MONGODB_URI)




const Link = mongoose.model('Link', linkSchema)

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, { family: 4 })
    .then(() => {
	logger.info('connected to MongoDB')
    })
    .catch((error) => {
	logger.error('error connecting to MongoDB:', error.message)
    })

app.use(express.json())

//index page, express statically
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/api/links', linksRouter)



module.exports = app
