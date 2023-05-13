
const sql = require('../config/conn');
var validator = require('./../helper/validate');
var consModel = require('../models/commonModel');
const moment = require('moment');
let now = moment().utc();
var md5 = require('md5');


async function UpdateUser(obj, req) {
    return new Promise(function (resolve, reject) {
        let query = "UPDATE `users` SET ? WHERE emailid=? and is_active=?";
        let data = [obj, req.body.email, 0];

        sql.query(query, data, async (err, result, cache) => {
            if (err) {
                resolve(false);
            }
            if (result.affectedRows) {
                resolve(true);
            }
            else resolve(false);
        });
    });
};

module.exports = {


    Signup: async (req, res) => {
        // console.log(req);
        let list = await consModel.CheckUniqueEmail(req);

        if (list.length === 0) {
            let result = await consModel.Registration(req, res);
            if (result) {
                res.status(200)
                    .send({
                        status: 200,
                        message: 'User Register Successfully..!',
                        data: []
                    })
            } else {
                res.status(400)
                    .send({
                        status: 400,
                        message: 'User not registered..!',
                        data: []
                    })
            }
        } else {
            res.status(400)
                .send({
                    status: 400,
                    message: 'Email already Exists..!',
                    data: []
                });
        }


    },

    Login: async (req, res) => {
        let d_d_query = "SELECT * FROM `users` WHERE `emailid`=? AND `is_active`=?";
        let d_d_data = [req.body.username, 0];
        let d_d_result = await consModel.QueryListData(d_d_query, d_d_data, res);
        if (d_d_result && d_d_result.length == 1) {
            let query = "SELECT id,role,fullname,emailid,is_active FROM `users` WHERE emailid=? AND password=? AND is_active=?";
            let data = [req.body.username, md5(req.body.password), 0];
            sql.query(query, data, async (err, result) => {
                if (err) {
                    res.status(401)
                        .send({
                            success: false,
                            message: 'Something is wrong..!',
                            data: []
                        });
                }

                if (result.length) {
                    res.status(200)
                        .send({

                            success: true,
                            message: 'Login Successfully..!',
                            data: result
                        });
                } else {
                    res.status(400)
                        .send({
                            success: false,
                            message: 'Password Incorrect!',
                            data: []
                        });
                }
            });
        } else {
            res.status(400)
                .send({
                    success: false,
                    message: 'Username InCorrect!',
                    data: []
                })
        }


    },
    ForgotPassword: async (req, res) => {
        let d_d_query = "SELECT * FROM `users` WHERE `emailid`=? AND `is_active`=?";
        let d_d_data = [req.body.email, 0];
        let d_d_result = await consModel.QueryListData(d_d_query, d_d_data, res);
        let obj = {};
        if (d_d_result && d_d_result.length == 1) {
            obj.forgot_otp_verify = '0';
            var OTP = Math.floor(1000 + Math.random() * 9000);
            obj.forgot_otp = OTP;
            //var OTP_msg = "OTP is " + OTP + " for setting a new password on aidbees and is valid for 2 hours. If you weren't expecting it, please contact us on www.aidbees.org ";
            let updateUser = await UpdateUser(obj, req);
            if (updateUser) {
                res.status(200)
                    .send({
                        success: true,
                        message: 'Otp Sent in your mail..',
                        data: []
                    })
            } else {
                res.status(400)
                    .send({
                        success: true,
                        message: 'Something Wrong..',
                        data: []
                    })
            }
        }
    },
    OtpVerify: async (req, res) => {
        let query = "UPDATE `users` SET forgot_otp_verify=? WHERE forgot_otp=? AND is_active=? and emailid=?";
        let data = ['1', req.body.otp, 0, req.body.email];
        sql.query(query, data, (err, result, cache) => {
            if (err) {
                res.status(400)
                    .send({
                        success: true,
                        message: 'Something Wrong..',
                        data: []
                    })
            }
            if (result.affectedRows > 0) {
                res.status(200)
                    .send({
                        success: true,
                        message: 'Otp Verified..',
                        data: []
                    })
            }
            else {
                res.status(400)
                    .send({
                        success: false,
                        message: 'Something Wrong..',
                        data: []
                    })
            }

        });
    },
    ChangePassword: async (req, res) => {
        let d_d_query = "SELECT * FROM `users` WHERE `emailid`=? AND `is_active`=?";
        let d_d_data = [req.body.email, 0];
        let d_d_result = await consModel.QueryListData(d_d_query, d_d_data, res);
        let obj = {};
        if (d_d_result && d_d_result.length == 1) {
            if (req.body.password === req.body.confirmpassword) {
                obj.password = md5(req.body.password);
                obj.confirm_password = md5(req.body.confirmpassword);
                let updateUser = await UpdateUser(obj, req);
                if (updateUser) {
                    res.status(200)
                        .send({
                            success: true,
                            message: 'Password Changed..',
                            data: []
                        })
                } else {
                    res.status(400)
                        .send({
                            success: true,
                            message: 'Something Wrong..',
                            data: []
                        })
                }
            } else {
                res.status(200)
                    .send({
                        success: true,
                        message: 'Password And Confirm Password Incorrect..',
                        data: []
                    })
            }

        }
    }

}


