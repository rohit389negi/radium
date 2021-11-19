const AuthorModel= require("../models/authorModel.js")
const BookModel= require("../models/bookModel")
const publisherModel= require("../models/publisherModel")

const createPublisher= async function (req, res) {
    var data= req.body
    let savedData= await publisherModel.create(data)
    res.send({data: savedData})    
}




module.exports.createPublisher= createPublisher