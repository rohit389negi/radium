const BlogModel = require("../models/blogModel.js");
const AuthorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken")

const createBlog = async function (req, res) {
    try {
        const data = req.body;
        const authorId = req.body.authorId;
        const tokenAutherId = req["x-api-key"]['_id']

        if (data.title && data.body && data.authorId && data.category) {

            if (authorId === tokenAutherId) {

                if (data.isPublished == false) {
                    let blogData = await BlogModel.create(data);
                    return res.status(201).send({ status: true, data: blogData });
                } else {
                    data.publishedAt = new Date();
                    let blogData = await BlogModel.create(data);
                    return res.status(201).send({ status: true, data: blogData });
                }

            } else {
                return res.status(403).send({ status: false, msg: "Not Authorised, Please login from requested account" });
            }
        } else {
            return res.status(400).send({ status: false, msg: "Required field missing" });
        }
    } catch {
        return res.status(500).send({ status: false, msg: "Something went wrong" });
    }
};


const login = async function (req, res) {
    try {
        let credentials = req.body;
        let validCredentials = await AuthorModel.findOne(credentials);
        if (!validCredentials) {
            return res.status(200).send({ status: false, msg: "Invalid email or Password " });
        } else {
            let payload = { _id: validCredentials._id };
            let validToken = jwt.sign(payload, "mySecretKey");
            res.header("x-auth-token", validToken);
            return res.status(200).send({ status: true, msg: "Login Successful", validCredentials });
        }
    }
    catch (err) {
        return res.status(500).send({ staus: false, msg: "sorry, server failurereturn" })
    }
};
const getBlogs = async function (req, res) {
    try {
        let filter = {
            isDeleted: false,
            isPublished: true
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
        const autherId = req.query.autherId
        const tokenAutherId = req["x-api-key"]['_id']
        if (autherId) {
            if (autherId == tokenAutherId) {

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
                    return res.status(200).send({ status: true, msg: "Blog has been deleted" });
                } else {
                    return res.status(404).send({ status: false, msg: "No such blog exist" });
                }
            } else {
                return res.status(403).send({ status: false, msg: "Not Authorised, Please login from request account" });
            }
        } else {
            const filter = {
                isDeleted: false,
            };
            if (req.query.category) {
                filter["category"] = req.query.category;
            }
            if (req.query.authorId) {
                filter["authorId"] = tokenAutherId;
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
                return res.status(204).send({ status: true, msg: "Blog has been deleted" });
            } else {
                return res.status(404).send({ status: false, msg: "No such blog exist" });
            }

        }
    } catch {
        return res.status(500).send({ status: false, msg: "Something went wrong" });
    }
};

const updatedBlog = async function (req, res) {
    try {

        let newData = req.body //i am taking the data in my body which i have to update
        let blogId = req.params.blogId//i am providing the id from which blog i have to update
        const tokenAutherId = req["x-api-key"]['_id']
        let checkingIt = await BlogModel.findOne({ _id: blogId })//i am taking the id  of blog data

        if (checkingIt) {
            if (tokenAutherId == checkingIt.authorId) {
                if (checkingIt.isDeleted == false)//inside my if condition i am checking that isPublished is  false and isDeleted is false
                {
                    if (newData.isPublished == true) {
                        newData.publishedAt = new Date()
                        if (newData.tags && checkingIt.tags) {
                            newData.tags = [...newData.tags, ...checkingIt.tags]
                        }
                        if (newData.subcategory && checkingIt.subcategory) {
                            newData.subcategory = [...newData.subcategory, ...checkingIt.subcategory]
                        }
                        let blogUpdated = await BlogModel.findOneAndUpdate({ _id: blogId }, newData, { upsert: true, new: true })  //$set: { title: newData.title, body: newData.body, tags: newData.tags, subcategory: newData.subcategory, isPublished: true }
                        //i am using findOneAndUpdate and updateing the data 
                        console.log(blogUpdated)
                        return res.status(200).send({ staus: true, msg: 'UpdatedBlog', NewBlog: blogUpdated })
                    } else {
                        let blogUpdated = await BlogModel.findOneAndUpdate({ _id: blogId }, newData, { upsert: true, new: true })
                        return res.status(200).send({ staus: true, msg: 'UpdatedBlog', NewBlog: blogUpdated })
                    }
                } else {
                    return res.status(404).send({ staus: false, msg: "Blog dos not exist" })
                }
            } else {
                return res.status(403).send({ staus: false, msg: "Not Authorised, Please login from request account" })
            }
        } else {
            return res.status(404).send({ staus: false, msg: "Blog dos not exist" })
        }

    } catch (err) {
        return res.status(500).send({ msg: 'somthing went wrong' })
    }
}


const deleteBlogById = async function (req, res) {

    try {

        const id = req.params.blogid
        const tokenAutherId = req["x-api-key"]['_id']
        let blogData = await BlogModel.findOne({ _id: id })

        if (blogData) {
            if (blogData.authorId === tokenAutherId["_id"]) {
                if (blogData.isDeleted == false) {
                    await BlogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() });
                    return res.status(204).send({ Message: "blog Deleted" })
                }
                else {
                    return res.status(404).send({ Message: "Blog document not exist" })
                }
            } else {
                return res.status(403).send({ staus: false, msg: "Not Authorised, Please login from request account" })
            }
        } else {
            return res.status(404).send({ Message: "blog document not exist" })
        }
    } catch (err) {
        return res.status(500).send({ Message: "something went wrong" })


    }
}

module.exports.deleteBlogById = deleteBlogById
module.exports.getBlogs = getBlogs;
module.exports.createBlog = createBlog;
module.exports.specificDelete = specificDelete;
module.exports.updatedBlog = updatedBlog
module.exports.login = login;
