const BlogModel = require("../models/blogModel.js");
const AuthorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken")

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let authorId = req.body.authorId;
    let checkauthorId = await AuthorModel.findById(authorId);

    if (authorId) {
      if (checkauthorId) {
        if (data.isPublished == false) {
          let blogData = await BlogModel.create(data);
          res.status(201).send({ status: true, data: blogData });
        } else {
          data.publishedAt = new Date();
          let blogData = await BlogModel.create(data);
          res.status(201).send({ status: true, data: blogData });
        }
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

const updatedBlog = async function (req, res) {
  try {
      let newData = req.body //i am taking the data in my body which i have to update

      let blogId = req.params.blogId//i am providing the id from which blog i have to update

      let checkingIt = await BlogModel.findOne({ _id: blogId })//i am taking the id  of blog data
      if (checkingIt) {
          if (checkingIt.isDeleted == false)//inside my if condition i am checking that isPublished is  false and isDeleted is false
          {
              if (newData.isPublished == true) {
                  newData.publishedAt = new Date()
                  let blogUpdated = await BlogModel.findOneAndUpdate({ _id: blogId }, newData, { upsert: true, new: true })  //$set: { title: newData.title, body: newData.body, tags: newData.tags, subcategory: newData.subcategory, isPublished: true }
                  //i am using findOneAndUpdate and updateing the data 
                  console.log(blogUpdated)
                  res.status(201).send({ staus: true, msg: 'UpdatedBlog', NewBlog: blogUpdated })
              } else {
                  let blogUpdated = await BlogModel.findOneAndUpdate({ _id: blogId }, newData, { upsert: true, new: true })
                  res.status(202).send({ staus: true, msg: 'UpdatedBlog', NewBlog: blogUpdated })
              }
          } else {
              res.status(404).send({ staus: false, msg: "Blog dos not exist" })
          }
      } else {
          res.status(404).send({ staus: false, msg: "Blog dos not exist" })
      }

  } catch (err) {
      res.status(500).send({ msg: 'somthing went wrong' })
  }
}

const login = async function (req, res) {
  let credentials = req.body;
  let validCredentials = await AuthorModel.findOne(credentials);
  if (!validCredentials) {
    res.send({ status: false, msg: "Invalid Username or Password " });
  } else if (validCredentials.isDeleted) {
    res.send({ status: false, msg: "User doesn't exist" });
  } else {
    let payload = { _id: validCredentials._id };
    const validToken = jwt.sign(payload, "mySecretKey");
    res.header("x-auth-token", validToken);
    res.send({ status: true, msg: "Login Successful"});
  }
};


module.exports.getBlogs = getBlogs;
module.exports.createBlog = createBlog;
module.exports.specificDelete = specificDelete;
module.exports.updatedBlog = updatedBlog
module.exports.login = login;
