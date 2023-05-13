var express = require('express');
var router = express.Router();

var commonApiController= require('../controller/commonApiController');
var userApiController= require('../controller/consumerApiController');

router.post('/signup',commonApiController.Signup);

router.get('/details',commonApiController.details);





module.exports = router;