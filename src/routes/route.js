const express = require('express');
const router = express.Router();


const AuthorController= require("../controllers/authorController")
const BlogController= require("../controllers/blogController")




router.post('/createAuthor',  AuthorController.createAuthor  );




module.exports = router;