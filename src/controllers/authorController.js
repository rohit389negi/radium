const AuthorModel = require("../models/authorModel.js")

const createAuthor = async function (req, res) {
    try {

        let data = req.body                                                                         //saving body data
        if(data.fname && data.lname && data.title && data.email && data.password) {
        if (data) {
            const verifyEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))   //validating Email using #regex
            if (verifyEmail) {
                let savedData = await AuthorModel.create(data)                                       //saving auther details in "Authors" collection
                return res.status(201).send({status: true, msg: savedData })
            } else {
                return res.status(401).send({ status: false, msg: "invalid email" })
            }
        } else {
            return res.status(400).send({status: false, msg: "please provide Auther data" })
        }
    } else {
        return res.status(401).send({ status: false, msg: "Required fieled is missing" })
    }

    } catch (err) {
        return res.status(500).send({status: false, msg: "server failure", err })
    }
}

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


module.exports.createAuthor = createAuthor
module.exports.login = login; 