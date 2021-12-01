const express = require('express');
const router = express.Router();


const AuthorController= require("../controllers/authorController")
const BlogController= require("../controllers/blogController")
const Authorization = require("../middlewares/authorizationMiddleware")




router.post('/createAuthor',  AuthorController.createAuthor  );
router.post('/login', AuthorController.login)
router.post('/blogs', Authorization.authorization, BlogController.createBlog)
router.get('/blogs', Authorization.authorization, BlogController.getBlogs);
router.put('/updateBlog/:blogId', Authorization.authorization , BlogController.updatedBlog)
router.delete('/blogs/:blogid', Authorization.authorization, BlogController.deleteBlogById  );
router.delete('/blogs', Authorization.authorization, BlogController.specificDelete)


module.exports = router;