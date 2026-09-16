const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()

const linkSchema = mongoose.Schema({
    name: String,
    url: String,
    note: String,
})

const Link = mongoose.model('Link', linkSchema)

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())

app.get('/api/links', (req, res) => {
    Link.find({}).then((links) => {
	res.json(links)
	console.log(links)
	})
})

//... more routes

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
