const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Book name is required',
        trim: true
    },
    author: {
        type: String,
        required: 'Author name is required',
        trim: true
    },
    category: {
        type: String,
        required: 'Category is required',
        trim: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)