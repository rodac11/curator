const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const path = require('path')
const app = express()

const linkSchema = mongoose.Schema({
    name: String,
    url: String,
    note: String,
})


linkSchema.set('toJSON', {
    transform: (document, returnedObject) => {
	returnedObject.id = returnedObject._id.toString()
	delete returnedObject._id
	delete returnedObject.__v
    }
    })


const Link = mongoose.model('Link', linkSchema)

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())

//index page, express statically
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//get All
app.get('/api/links', (req, res) => {
    Link.find({}).then((links) => {
	res.json(links)
	//console.log(links)
	})
})

//get 1 by ID
app.get('/api/links/:id', (req, res) => {
    console.log(req.params)
    Link.findById(req.params.id).then((link) => {
	if (link) {
	    res.json(link)
	} else {
	    console.log('not found not found')
	    res.status(404).end()
	}
    })
})


//post
app.post('/api/links', (req, res, next) => {
    const body = req.body
    if(!body) {
	return res.status(400).json({
	    error: 'nothing to post',
	})
    }
    if (!body.name) {
	return res.status(400).json({
	    error: 'missing name'
	})
    }
    if (!body.url) {
	return res.status(400).json({
	    error: 'missing url'
	})
    }
    if (!body.note) {
	body.note = ''
    }
    //unique name? unique url?
    const link = new Link({
	name: body.name,
	url: body.url,
	note: body.note,
    })

    link.save().then(savedLink => {
	res.json(savedLink)
	console.log("POST")
    })
	.catch(error => next(error))
})

//put
app.put('/api/links/:id', (req, res, next) => {
    const body = req.body

    Link.findById(req.params.id)
	.then((link) => {
	    if(!link) {
		return res.status(404).end()
	    }

	    link.name = body.name
	    link.url = body.url
	    link.note = body.note

	    return link.save().then((updatedLink) => {
		res.json(updatedLink)
	    })
	})
	.catch((error) => next(error))
})
	    


app.delete('/api/links/:id', (req, res, next) => {
    Link.findByIdAndDelete(req.params.id)
	.then(
	    res.status(204).end()
	)
	.catch(error => next (error))
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
