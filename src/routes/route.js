const express = require('express');
const router = express.Router();
const myuser=require('../controllers/myuserController')
const login =require('../controllers/loginController')
const loginmw=require('../middlewares/loginmw')

router.post('/createnewuser',  myuser.createnewUser );
router.post('/createlogin',login.createnewlogin)
router.get('/users/:userid',loginmw.loginmw,myuser.getuser)
router.put('/users/:userid',loginmw.loginmw,myuser.putuser)
module.exports = router;


