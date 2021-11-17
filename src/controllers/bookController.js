const BookModel= require("../models/bookModel.js")
const AuthorController= require("../controllers/authorController")
const AuthorModel= require("../models/authorModel")


const createBook= async function (req, res) {
    var data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})    
}

const authorBooks = async function(x) {
    let savedData= await BookModel.find(x).select({name:1, _id:0})
  // console.log(savedData)
    return savedData;
}

const twoState= async function (req, res) {
    
    let savedData= await BookModel.findOne({name:"Two states"}).select({author_id:1, _id:0})
    //console.log(savedData)
    let author = await AuthorModel.findOne(savedData).select({author_name:1, _id:0})
    //console.log(author)
    let uPrice = await BookModel.findOneAndUpdate({name:"Two states"},{price: 100}, {new:true}).select({price:1, _id:0})
    //console.log(uPrice)
    res.send({msg:author,uPrice})    
}

const priceBook= async function (req, res) {
const book = await BookModel.find({price:{ $gt: 49, $lt: 101}}).select({author_id:1, _id:0})
//console.log(book)
const author1 = await AuthorModel.find({$or :book}).select({author_name:1, _id:0}) 
//console.log(author1)
res.send(author1)
}

module.exports.createBook= createBook
module.exports.authorBooks= authorBooks
module.exports.twoState= twoState
module.exports.priceBook= priceBook