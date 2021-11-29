const BookModel = require("../models/bookModel.js")
const AuthorController = require("../controllers/authorController")
const AuthorModel = require("../models/authorModel")
const publisherModel = require("../models/publisherModel")


const createBook = async function (req, res) {
    let data = req.body
    let authorId = req.body.author
    let publisherId = req.body.publisher
    let checkauthorId = await AuthorModel.findById(authorId)
    let checkpublisherId = await publisherModel.findById(publisherId)

    if (authorId) {
        if (publisherId) {
            if (checkauthorId) {
                if (checkpublisherId) {


                    let bookData = await BookModel.create(data)
                    res.send({ Data: bookData })
                } else {
                    res.send({ msg: "No publisher found crossponding ID" })
                }

            } else {
                res.send({ msg: "No author found crossponding ID" })
            }
        } else {
            res.send({ msg: "Please, Provide Publisher Id" })

        }
    } else {
        res.send({ msg: "Please, Provide Author Id" })
    }
}
const listBooks = async function (req, res) {
    let savedData = await BookModel.find().populate('author', { "author_name": 1, "_id": 1, "age": 1 })


    res.send({ savedData })
}

module.exports.createBook = createBook
module.exports.listBooks = listBooks
