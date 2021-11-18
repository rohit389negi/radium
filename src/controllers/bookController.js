const BookModel= require("../models/bookModel.js")
const AuthorController= require("../controllers/authorController")
const AuthorModel= require("../models/authorModel")


const createBook= async function (req, res) {
    var data= req.body
    let check = await AuthorModel.findOne({_id: req.body.author})
    if(check){

    let savedData= await BookModel.create(data)
    res.send({msg: savedData}) 
    } else {
        res.send({msg:"No author found crossponding ID"})
    }   
}
const listBooks = async function(req, res) {
    let savedData= await BookModel.find().populate('author')

     
     res.send({savedData})
}

module.exports.createBook= createBook
module.exports.listBooks= listBooks
