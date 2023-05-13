const sql = require('../config/conn');
const moment = require('moment');
let now = moment().utc();
var md5 = require('md5');



exports.CheckUniqueEmail = (req) => {
    return new Promise(function (resolve, reject) {
        let query = "SELECT * FROM `users` WHERE is_active=? AND `emailid`=?";
        let data = ['0', req.body.email];
        sql.query(query, data, (err, result, cache) => {
            if (err) {
                logger.error(err);
            }
            if (result) resolve(result);

            else resolve([]);
        });
    });
};

exports.Registration = (req, res) => {
    return new Promise(function (resolve, reject) {
        let create_at = moment().utc().format("YYYY-MM-DD HH:mm:ss");
        let update_at = moment().utc().format("YYYY-MM-DD HH:mm:ss");
        //var OTP = Math.floor(1000 + Math.random() * 9000);
        //var OTP_msg= " OTP is "+OTP+" for registering on aidbees, the social kindness platform and is valid for 2 hours. Do not share this OTP with anyone for security reasons.";
        let query = "INSERT INTO `users`(`role`,`fullname`, `emailid`,`password`,`confirm_password`,`mobile_no`) VALUES (?,?,?,?,?,?)";
        let data = [req.body.role, req.body.name, req.body.email, md5(req.body.password), md5(req.body.confirm_password), req.body.mobile_no];
        sql.query(query, data, async (err, result, cache) => {
            if (err) {
                console.log(err)
                res.status(500)
                    .send({
                        success: false,
                        message: 'Internal server error..!',
                        data: err
                    });
            }
            if (result.insertId) {
                resolve([]);
            }

            else {
                resolve(false);
            }

        });
    });
};
