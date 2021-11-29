const BlogModel = require("../models/blogModel.js")


const getBlogs = async function (req, res) {

    try {
        const filter = {
            isDeleted: false,
            isPublished: true
        };
        if (req.query.authorId) {
            filter["authorId"] = req.query.authorId
        }
        if (req.query.category) {
            filter["category"] = req.query.category
        }
        if (req.query.tags) {
            filter["tags"] = req.query.tags
        }
        if (req.query.subcategory) {
            filter["subcategory"] = req.query.subcategory
        }
       

        const blogs = await BlogModel.find(filter)
        if (blogs.length>0) {
            return res.status(200).send({ status: true, data: blogs })
        } else {

            return res.status(404).send({ status: false, msg: "not found" })
        }
    }
    catch (err) {
        res.status(500).send({ msg: "server error" })
    }



}







module.exports.getBlogs = getBlogs