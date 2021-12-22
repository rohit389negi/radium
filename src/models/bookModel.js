const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required:'title is required',
        unique: true,
        trim:true
    },

    excerpt: {
        type: String,
        required:'excerpt is required',
        trim:true
    },
    
    ISBN: {
        type: String,
        required:'ISBN is required',
        unique: true,
        trim:true
    },

    category: {
        type: String,
        required:'category is required',
        trim:true
    },

    subcategory: {
        type:String,
        required:'subcategory is required',
        trim:true
    },

    reviews: {
        type:Number,
        default: 0
    },

    deletedAt: {
        type: Date,
        default: null
    }, 

    isDeleted:{
        type: Boolean,
        default: false
    },

    releasedAt:{
        type: Date,
        required:'releasedAt is required'
    },

    coverLink:{
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Bookcover', bookSchema )

    


    