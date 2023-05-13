var express = require('express');
var router = express.Router();

var commonApiController= require('../controller/commonApiController');
var userApiController= require('../controller/consumerApiController');

router.post('/signup',commonApiController.Signup);

router.post('/login',commonApiController.Login);

// #Consumer - Get all Appliances
router.get('/getAppliances',userApiController.getallAppliances);
// #Consumer - Get details for creating Service Requests
router.get('/serviceRequest/:appliance_id',userApiController.serviceApplianceDetails);
// #Consumer - Create Service Requests for appliances
router.post('/serviceRequest',userApiController.insertServiceRequest);

router.post('/forgot_password',commonApiController.ForgotPassword);

router.post('/otp_verify',commonApiController.OtpVerify);

router.post('/change_password',commonApiController.ChangePassword);




module.exports = router;