const BlogModel = require("../models/blogModel.js");
const AuthorModel = require("../models/authorModel");

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let authorId = req.body.authorId;
    let checkauthorId = await AuthorModel.findById(authorId);

    if (authorId) {
      if (checkauthorId) {
        let blogData = await BlogModel.create(data);
        res.status(201).send({ status: true, data: blogData });
      } else {
        res.status(404).send({ msg: "No author found crossponding ID" });
      }
    } else {
      res.status(400).send({ msg: "Please, Provide Author Id" });
    }
  } catch {
    res.status(500).send({ msg: "Something went wrong" });
  }
};

const getBlogs = async function (req, res) {
  try {
    const filter = {
      isDeleted: false,
      isPublished: true,
    };
    if (req.query.authorId) {
      filter["authorId"] = req.query.authorId;
    }
    if (req.query.category) {
      filter["category"] = req.query.category;
    }
    if (req.query.tags) {
      filter["tags"] = req.query.tags;
    }
    if (req.query.subcategory) {
      filter["subcategory"] = req.query.subcategory;
    }

    const blogs = await BlogModel.find(filter);
    if (blogs.length > 0) {
      return res.status(200).send({ status: true, data: blogs });
    } else {
      return res.status(404).send({ status: false, msg: "not found" });
    }
  } catch (err) {
    res.status(500).send({ msg: "server error" });
  }
};

const specificDelete = async function (req, res) {
  try {
    const filter = {
      isDeleted: false,
    };
    if (req.query.category) {
      filter["category"] = req.query.category;
    }
    if (req.query.authorId) {
      filter["authorId"] = req.query.authorId;
    }
    if (req.query.tags) {
      filter["tags"] = req.query.tags;
    }
    if (req.query.subcategory) {
      filter["subcategory"] = req.query.subcategory;
    }
    if (req.query.isPublished) {
      filter["isPublished"] = req.query.isPublished;
    }

    let deleteData = await BlogModel.updateMany(filter, {
      isDeleted: true,
      deletedAt: new Date(),
    });
    if (deleteData) {
      res.status(200).send({ status: true, msg: "Blog has been deleted" });
    } else {
      res.status(404).send({ status: false, msg: "No such blog exist" });
    }
  } catch {
    res.status(500).send({ status: false, msg: "Something went wrong" });
  }
};

module.exports.getBlogs = getBlogs;
module.exports.createBlog = createBlog;
module.exports.specificDelete = specificDelete;
