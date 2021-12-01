const BlogModel = require("../models/blogModel.js");

const createBlog = async function (req, res) {
    try {
        const data = req.body;
        const authorId = req.body.authorId;
        const tokenAutherId = req["x-api-key"]['_id']

        if (data.title && data.body && data.authorId && data.category) {

            if (authorId === tokenAutherId) {

                if (!data.isPublished || data.isPublished == false) {
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
        const authorId1 = req.query.authorId
        const tokenAuthorId = req["x-api-key"]['_id']
        if (authorId1) {
            if (authorId1 == tokenAuthorId) {

                const filter = {
                    isDeleted: false,
                    authorId: req.query.authorId
                };
                if (req.query.category) {
                    filter["category"] = req.query.category;
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
                    deletedAt: new Date()
                });
                if (deleteData.matchedCount > 0) {
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
                authorId: tokenAuthorId
            };
            if (req.query.category) {
                filter["category"] = req.query.category;
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

            let deleteData = await BlogModel.updateMany(filter, { isDeleted: true, deletedAt: new Date() });
            if (deleteData.matchedCount > 0) {
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
                    if (newData.isPublished === true) {
                        newData.publishedAt = new Date()
                        if (newData.tags && checkingIt.tags) {
                            if (typeof (newData.tags) === "object") {
                                newData.tags = [...newData.tags, ...checkingIt.tags]
                            } else {
                                return res.status(404).send({ staus: false, msg: "Please send tags in 'array' format" })
                            }
                        }
                        if (newData.subcategory && checkingIt.subcategory) {

                            if (typeof (newData.subcategory) === "object") {
                                newData.subcategory = [...newData.subcategory, ...checkingIt.subcategory]
                            } else {
                                return res.status(404).send({ staus: false, msg: "Please send subcategory in 'array' format" })
                            }
                        }
                        let blogUpdated = await BlogModel.findOneAndUpdate({ _id: blogId }, newData, { upsert: true, new: true })  //$set: { title: newData.title, body: newData.body, tags: newData.tags, subcategory: newData.subcategory, isPublished: true }


                        return res.status(200).send({ staus: true, msg: 'Blog is Updated', NewBlog: blogUpdated })
                    } else {
                        if (newData.tags && checkingIt.tags) {
                            if (typeof (newData.tags) === "object") {
                                newData.tags = [...newData.tags, ...checkingIt.tags]
                            } else {
                                return res.status(404).send({ staus: false, msg: "Please send tags in 'array' format" })
                            }
                        }
                        if (newData.subcategory && checkingIt.subcategory) {

                            if (typeof (newData.subcategory) === "object") {
                                newData.subcategory = [...newData.subcategory, ...checkingIt.subcategory]
                            } else {
                                return res.status(404).send({ staus: false, msg: "Please send subcategory in 'array' format" })
                            }
                        }
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
        let authorId = blogData.authorId
        if (blogData) {
            if (blogData.authorId == tokenAutherId) {
                if (blogData.isDeleted == false) {
                    await BlogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() });
                    return res.status(200).send({ status: true, Message: "blog Deleted" })
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

