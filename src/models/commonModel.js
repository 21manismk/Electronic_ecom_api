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

exports.getDamageLists = (req, res) => {
    return new Promise(function (resolve, reject) {
        let query = "SELECT d.id,d.`damage` FROM damage d  WHERE d.`status`=?";
        let data = ['0'];
        sql.query(query, data, (err, result) => {
            if (err) {
                resolve([])
            }
            if (result) resolve(result);

            else resolve([]);
        });
    });
};

exports.getApplianceDetails = (req, res) => {
    return new Promise(function (resolve, reject) {
        let query = "SELECT s.id AS appliance_id,s.appliance_name,CONCAT('images/',s.image) AS appliance_image,s.basic_labour_fee,ad.capacity FROM services s JOIN appliances_details ad ON s.id=ad.appliances_id WHERE s.id = ? AND s.`status` = ? AND ad.`status`=? GROUP BY ad.capacity";
        let data = [req.params.appliance_id,'0','0'];
        sql.query(query, data, (err, result) => {
            if (err) {
                resolve([])
            }
            if (result) resolve(result);

            else resolve([]);
        });
    });
}

exports.getApplianceBrandsbyId = (req, res) => {
    return new Promise(function (resolve, reject) {
        let query = "SELECT ad.brand AS brand_id, b.brand AS brand_name FROM appliances_details ad JOIN brands b ON b.id=ad.brand WHERE ad.appliances_id=? AND ad.`status`=? AND b.`status`=?";
        let data = [req.params.appliance_id,'0','0'];
        sql.query(query, data, (err, result) => {
            if (err) {
                resolve([])
            }
            if (result) resolve(result);

            else resolve([]);
        });
    });
}

exports.getApplianceModelsbyId = (req, res) => {
    return new Promise(function (resolve, reject) {
        let query = "SELECT ad.brand AS brand_id, ad.model_number FROM appliances_details ad JOIN brands b ON b.id=ad.brand WHERE ad.appliances_id=? AND ad.`status`=? AND b.`status`=?";
        let data = [req.params.appliance_id,'0','0'];
        sql.query(query, data, (err, result) => {
            if (err) {
                resolve([])
            }
            if (result) resolve(result);

            else resolve([]);
        });
    });
}
