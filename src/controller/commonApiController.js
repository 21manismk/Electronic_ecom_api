
const sql = require('../config/conn');
var validator = require('./../helper/validate');
var consModel = require('../models/consModel');


module.exports = {
  

Signup: async (req, res) => {
    let list = await consModel.CheckUniqueEmail(req);
    if (list.length === 0) {
        let result = await consModel.Registration(req, res);
        if (result) {
            res.send({
                success: true,
                message: 'User Register Successfully..!',
                data: result
            })
        } else {
            res.send({
                success: false,
                message: 'User not registered..!',
                data: ''
            })
        }
    } else {
        res.send({
            success: false,
            message: 'Email already Exists..!',
            data: ''
        })
    }


},

details: async (req,res)=>{
res.send({
    "message":"hihello"
})
},

}
    



