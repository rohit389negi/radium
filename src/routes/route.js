const express = require('express');
const router = express.Router();
const bModel= require("../models/bModel")
const aModel= require("../models/aModel")
const pModel= require("../models/pModel")


const bController= require("../controllers/bController")
const aController= require("../controllers/aController")
const pController= require("../controllers/pController")


router.post('/createBookCollection',  bController.createNewBook  );
router.post('/createAuthorCollection',  aController.createNewAuthor  );
router.get('/chetanBhagatBooksCollection', bController.chetanBhagatBook );
router.get('/updatedBookPrice', bController.updatePrice );
router.get('/sortByPrice', bController.sbooks );
router.get('/booksByPopulate', bController.getBooks );
router.post('/createPublisherCollection', pController.createNewPublisher );


module.exports = router;





