const express = require('express');
const router = express.Router();

const cowinController= require("../controllers/cryptoController")


router.get("/getCryptoList", cowinController.getCryptoList)


module.exports = router;