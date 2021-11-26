const express = require('express');
const router = express.Router();

const weatherController= require("../controllers/weatherController")

router.get("/weather/london", weatherController.getWeather)
router.get("/city/temp", weatherController.cityTemp)


module.exports = router;