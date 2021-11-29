const AuthorModel = require("../models/authorModel.js")

const createAuthor = async function (req, res) {
    try {

        let data = req.body
        if (data) {
            const verifyEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) ? true : false
            if (verifyEmail) {
                let savedData = await AuthorModel.create(data)
                return res.send({ msg: savedData })
            } else {
                return res.status(401).send({ status: false, msg: "invalid email" })
            }
        } else {
            return res.status(400).send({ msg: "please provide Auther data" })
        }


    } catch (err) {
        return res.status(500).send({ msg: "server failure", err })
    }
}




module.exports.createAuthor = createAuthor
