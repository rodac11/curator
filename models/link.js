const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Link', linkSchema)
