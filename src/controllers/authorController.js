const AuthorModel= require("../models/authorModel.js")
const BookController= require("../controllers/bookController")

const createAuthor= async function (req, res) {
    var data= req.body
    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})    
}


const listBooks = async function(req, res) {
    let savedData= await AuthorModel.findOne({author_name: "Chetan Bhagat"}).select({author_id:1, _id:0})
     const book = await BookController.authorBooks(savedData)
     console.log(savedData)
     res.send({book})
}

module.exports.createAuthor= createAuthor
module.exports.listBooks= listBooks