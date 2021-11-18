const pModel = require("../models/pModel");
const mongoose = require("mongoose");

// create APIs for publisher
const createNewPublisher = async function (req, res) {
  const publisher = req.body;
  let publisherCollection = await pModel.create(publisher);
  res.send({publisherCollection});
};



// const getAuthors= async function (req, res) {
//   let allAuthors= await authorModel.find()
//   res.send({data: allAuthors})
// }




 module.exports.createNewPublisher = createNewPublisher;
