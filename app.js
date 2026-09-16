const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const linksRouter = require('./controllers/links')
const logger = require('./utils/logger')
//const middleware = require('./utils/middleware')
const config = require('./utils/config')


const app = express()

//TODO: REFACTOR INTO DIFFERENT FILES
//TODO: ADD MIDDLEWARE FOR LOGGING AND ENDPOINTS

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { family: 4 })
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
