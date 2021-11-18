const aModel = require("../models/aModel");
const mongoose = require("mongoose");

// create APIs for authors
const createNewAuthor = async function (req, res) {
  const author = req.body;
  let authorCollection = await aModel.create(author);
  res.send({authorCollection});
};



// const getAuthors= async function (req, res) {
//   let allAuthors= await authorModel.find()
//   res.send({data: allAuthors})
// }




 module.exports.createNewAuthor = createNewAuthor;
