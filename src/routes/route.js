const express = require('express');
const router = express.Router();
const bModel= require("../models/bModel")
const aModel= require("../models/aModel")

const bController= require("../controllers/bController")
const aController= require("../controllers/aController")



router.post('/createBookCollection',  bController.createNewBook  );
router.post('/createAuthorCollection',  aController.createNewAuthor  );
router.get('/chetanBhagatBooksCollection', bController.chetanBhagatBook );
router.get('/updatedBookPrice', bController.updatePrice );
router.get('/sortByPrice', bController.sbooks );

module.exports = router;





