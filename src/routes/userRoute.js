var express = require('express');
var router = express.Router();

var commonApiController= require('../controller/commonApiController');
var userApiController= require('../controller/consumerApiController');

router.post('/signup',commonApiController.Signup);

router.get('/details',commonApiController.details);

// #Consumer - Get all Appliances
router.get('/getAppliances',userApiController.getallAppliances);
// #Consumer - Get details for creating Service Requests
router.get('/serviceRequest/:appliance_id',userApiController.serviceApplianceDetails);
// #Consumer - Create Service Requests for appliances
router.post('/serviceRequest',userApiController.insertServiceRequest);





module.exports = router;