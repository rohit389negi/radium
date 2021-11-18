const aModel = require("../models/aModel");
const bModel = require("../models/bModel");
const pModel = require("../models/pModel");
const mongoose = require("mongoose");


// create APIs for books
const createNewBook = async function (req, res) {
  const book = req.body;
  let authId = req.body.author
  let pubId = req.body.publisher
  let authFrmReq = await aModel.findById(authId)
  let pubFrmReq = await pModel.findById(pubId)
  if (authFrmReq) {
    if (pubFrmReq) {
    let bookCollection = await bModel.create(book);
    res.send({book:bookCollection}) }
    else { 
      res.send('The publisher ID provided is not valid')
     }
  } else {
    res.send('The author ID provided is not valid')
  }
  
};


const getBooks = async function (req, res) {
  let allBooks = await bModel.find().populate('author', {"author_name":1, _id:1, "age":1});
  res.send({ msg: allBooks });
};


// books written by Chetan Bhagat
const chetanBhagatBook = async function(req, res) {
  let authorDetails= await aModel.findOne({author_name:"Chetan Bhagat"})
  let storedDetails = authorDetails.author_id
  let listOfBooks = await bModel.find({author_id: storedDetails}).select({name:1,_id:0})
  res.send({listOfBooks})
}

// find and update
const updatePrice = async function (req, res) {
  let bookName= await bModel.findOneAndUpdate({name:"Two states"},{price:100},{new: true}).select({price:1,_id:0}) ;
  let fAuthor= await bModel.findOne({name:"Two states"})  
  let authDetails= fAuthor.author_id
  let authorName= await aModel.find({author_id: authDetails}).select({author_name:1,_id:0}) 
res.send({authorName, bookName});
};

//gte50-lte100
// const cost = async function (req, res) {
// let all= await bModel.find( {price: [{$gte: 50} && { $lte: 100 } ]  } )
// let one= all.author_id
// let two= await aModel.find({author_id: one}).select({author_name:1,_id:0}) 
// res.send({all});
// };


//gte50-lte100
const sbooks = async function(req,res){
  let sb= await bModel.find({price:{$gte:50}&&{$lte:100}}).select({author_id:1,_id:0})
  let arr=[]
  for(let i=0;i<sb.length;i++){
     let x=sb[i].author_id 
     arr.push(x)
 }
  let auth=await aModel.find({author_id:arr}).select({author_name:1,_id:0})
  res.send(auth)
}



module.exports.createNewBook = createNewBook;
module.exports.chetanBhagatBook = chetanBhagatBook;
module.exports.updatePrice = updatePrice;
//module.exports.cost = cost;
module.exports.sbooks = sbooks;
module.exports.getBooks = getBooks;
