
const sql = require('../config/conn');
var validator = require('./../helper/validate');
var consModel = require('../models/consModel');


module.exports = {


    Signup: async (req, res) => {
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

    details: async (req, res) => {
        res.send({
            "message": "hihello"
        })
    },
    detailsPost: async (req, res) => {

    }

}




