const jwt = require('jsonwebtoken')

const authorization = async function (req, res, next) {

    try {

        const jwtToken = req.headers["x-api-key"]
        if (jwtToken) {
            const decodedToken = jwt.verify(jwtToken, "mySecretKey")
            if (decodedToken) {
            req["x-api-key"] = decodedToken;
            next();
            } else {
                return res.send({ status: false, msg: "Invalid Token" });
            }
        } else {
            return res.status(403).send({ status: false, msg: " Mandatory header missing" });
        }
    }
    catch (err) {
        return res.send({ status: false, msg: "sorry, server failure " })
    }
}

module.exports.authorization = authorization