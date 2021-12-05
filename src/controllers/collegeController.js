var validUrl = require('valid-url');
const CollegeModel = require('../models/collegeModel')


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
} 
const isValidName = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && (value.trim().length === 0 || value.trim().split(" ").length > 1 )) return false
    return true;
}

//function for request body validation
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

// College data entry in DB
const createCollege = async function (req, res) {
    try {
        const reqBody = req.body

        if (!isValidRequestBody(reqBody)) {
            res.status(400).send({ status: false, message: "Invalid Parameters, Please send correct college details" })
            return
        }

        //Extract params
        const { name, fullName, logoLink } = reqBody

        //Validation starts
        if (!isValidName(name)) {
            res.status(400).send({ status: false, message: "Name is required or cann't contains spaces " })
            return
        }
        if (!isValid(fullName)) {
            res.status(400).send({ status: false, message: "fullName is required " })
            return
        }
        if (!isValid(logoLink)) {
            res.status(400).send({ status: false, message: "logoLink is required " })
            return
        }

        if (!validUrl.isUri(logoLink.trim())){
            res.status(400).send({ status: false, message: "Invalid logoLink " })
            return
        }


        //Unique name validation
        const isNameAlreadyUsed = await CollegeModel.findOne({ name }) // {name: name} object shorthand property

        if (isNameAlreadyUsed) {
            res.status(400).send({ status: false, message: "Name is already in use, Try another name" })
            return
        }
        //Validation ends

        const collegeData = { name, fullName, logoLink }
        const newCollege = await CollegeModel.create(collegeData)

        return res.status(201).send({ status: true, message: "College registered successfully", newCollege })

    } catch (err) { 
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { createCollege }