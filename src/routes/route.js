const express = require('express');
const router = express.Router();


const AuthorController= require("../controllers/authorController")
const BlogController= require("../controllers/blogController")




router.post('/createAuthor',  AuthorController.createAuthor  );
router.get('/blogs',  BlogController.getBlogs  );
router.post('/blogs', BlogController.createBlog)
router.delete('/blogs', BlogController.specificDelete)



module.exports = router;