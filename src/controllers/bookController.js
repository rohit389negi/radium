const BookModel = require("../models/bookModel.js");
const mongoose = require("mongoose");

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidrequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId);
};

const createbooks = async function (req, res) {
    try {
        const requestBody = req.body;

        if (!isValidrequestBody(requestBody)) {
            res
                .status(400)
                .send({ status: false, message: "request body is not found" });
        }

        //extract params
        const {
            title,
            excerpt,
            ISBN,
            category,
            subcategory,
            review,
            releasedAt,
            coverLink
        } = requestBody;

        if (!isValid(title)) {
            res.status(400).send({ status: false, message: "title is required" });
            return;
        }

        if (!isValid(excerpt)) {
            res.status(400).send({ status: false, message: "excerpt required" });
            return;
        }

        if (!isValid(category)) {
            res.status(400).send({ status: false, message: "category required" });
            return;
        }

        if (!isValid(subcategory)) {
            res.status(400).send({ status: false, message: "subcategory required" });
            return;
        }

        if (!isValid(releasedAt)) {
            res.status(400).send({ status: false, message: "releasedAt required" });
            return;
        }

        if (!isValid(coverLink)) {
            res.status(400).send({ status: false, message: "coverLink is required" });
            return;
        }


        const istitleAlreadyUsed = await BookModel.findOne({ title });

        if (istitleAlreadyUsed) {
            res
                .status(400)
                .send({ status: false, message: `${title} title is already exist` });
            return;
        }

        const isISBNAlreadyUsed = await BookModel.findOne({ ISBN });

        if (isISBNAlreadyUsed) {
            res
                .status(400)
                .send({ status: false, message: `${ISBN} ISBN is already exist` });
            return;
        }

        //validation end

        const bookData = {
            title,
            excerpt,
            ISBN,
            category,
            subcategory,
            releasedAt: releasedAt ? releasedAt : "releasedAt field is mandatory",
            coverLink
        };
        let savedbook = await BookModel.create(bookData);
        res
            .status(201)
            .send({
                status: true,
                message: "book created succesfully",
                data: savedbook,
            });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

module.exports.createbooks = createbooks;


