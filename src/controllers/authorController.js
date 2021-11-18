const AuthorModel= require("../models/authorModel.js")
const BookModel= require("../models/bookModel")

const createAuthor= async function (req, res) {
    var data= req.body
    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})    
}




module.exports.createAuthor= createAuthor
