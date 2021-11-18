const express = require('express');
const router = express.Router();
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")

const AuthorController= require("../controllers/authorController")
const BookController= require("../controllers/bookController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/createAuthor',  AuthorController.createAuthor  );
router.post('/createBook',  BookController.createBook  );
router.get('/listBooks',  BookController.listBooks  );



module.exports = router;