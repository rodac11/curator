const linksRouter = require('express').Router()
const Link = require('../models/link')
const logger = require('../utils/logger')



linksRouter.get('/', (req, res) => {
    Link.find({}).then((links) => {
	res.json(links)
	logger.info("GETALL")
	})
})

linksRouter.get('/:id', (req, res) => {
    console.log(req.params)
    Link.findById(req.params.id).then((link) => {
	if (link) {
	    res.json(link)
	    logger.info("Got Link on ID")
	} else {
	    logger.info("ID not Found")
	    res.status(404).end()
	}
    })
})

linksRouter.post('/', (req, res, next) => {
    const body = req.body
    if(!body) {
	return res.status(400).json({
	    error: 'nothing to post',
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
    //unique url?
    const link = new Link({
	url: body.url,
	note: body.note,
    })

    link.save().then(savedLink => {
	res.json(savedLink)
	logger.info("POST")
    })
	.catch(error => next(error))
})

linksRouter.put('/:id', (req, res, next) => {
    const body = req.body

    Link.findById(req.params.id)
	.then((link) => {
	    if(!link) {
		return res.status(404).end()
	    }

	    link.url = body.url
	    link.note = body.note

	    return link.save().then((updatedLink) => {
		res.json(updatedLink)
		logger.info("PUT")
	    })
	})
	.catch((error) => next(error))
})

linksRouter.delete('/api/links/:id', (req, res, next) => {
    Link.findByIdAndDelete(req.params.id)
	.then(
	    res.status(204).end()
	)
	.catch(error => next (error))
})

module.exports = linksRouter
