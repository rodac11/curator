const mongoose = require('mongoose')

const linkSchema = mongoose.Schema({
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

module.experts = mongoose.model('Link', linkSchema)
