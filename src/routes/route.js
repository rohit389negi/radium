const express = require('express');
const router = express.Router();

const cowinController= require("../controllers/cowinController")

router.get("/weather/london", cowinController.getWeather)
router.get("/city/temp", cowinController.cityTemp)


module.exports = router;