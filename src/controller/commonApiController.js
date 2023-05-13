
const sql = require('../config/conn');
var validator = require('./../helper/validate');
var commonModel = require('../models/commonModel');


module.exports = {

    Signup: async (req, res) => {
        console.log(req)
        let list = await commonModel.CheckUniqueEmail(req);
        if (list.length === 0) {
            let result = await commonModel.Registration(req, res);
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

    details: async (req, res) => {
        res.send({
            "message": "hihello"
        })
    },

    

}




