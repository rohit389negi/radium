const express = require('express');

const router = express.Router();


const bookController = require('../controllers/bookController');

router.post('/createBook', bookController.resourceBook);


module.exports = router;