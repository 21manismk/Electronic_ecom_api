const sql = require('../config/conn');
const moment = require('moment');
let now = moment().utc();

exports.FetchAllAppliances = (req,res) => {
    return new Promise(function (resolve, reject) {
        let query = "SELECT s.id AS appliance_id,s.appliance_name,concat('images/',s.image) AS appliance_image,s.basic_labour_fee,s.`status` FROM services s where s.status=? ";
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