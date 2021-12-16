const bookModel = require('../models/bookModel')


const isValid = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const resourceBook = async function (req, res) {
    try {
        const requestBody = req.body;
        if(!isValidRequestBody(requestBody)) {
            res.status(400).send({status: false, message: 'Invalid request parameters. Please provide author details'})
            return
        }

        // Extract params
        const {name, author, category} = requestBody; // Object destructing

        // Validation starts
        if(!isValid(name)) {
            res.status(400).send({status: false, message: 'First name is required'})
            return
        }

        if(!isValid(author)) {
            res.status(400).send({status: false, message: 'Last name is required'})
            return
        }


        if(!isValid(category)) {
            res.status(400).send({status: false, message: `Category is required`})
            return
        }
        
        // Validation ends

        const bookData = {name, author, category}
        const newBook = await bookModel.create(bookData);

        res.status(201).send({status: true, message: `Book registered successfully`, data: newBook});
    } catch (error) {
        res.status(500).send({status: false, message: error.message});
    }
}

module.exports = {
    resourceBook
}

