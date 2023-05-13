const sql = require('../config/conn');
const moment = require('moment');
let now = moment().utc();
var md5 = require('md5');


async function addTechDtls(req,res,UserId){
	return new Promise(async function(resolve, reject){
        let query = "INSERT INTO `users_details`(`user_id`,`address`, `dob`,`gender`,`country`,`state`,`city`,`postalcode`) VALUES (?,?,?,?,?,?,?,?)";
        let data = [UserId, req.body.address, req.body.dob, req.body.gender, req.body.country, req.body.state,req.body.city,req.body.postalcode];
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
}
async function addTechAttachments(req,res,UserId){
	return new Promise(async function(resolve, reject){
        if (req.files && req.files.images) {
			var images = req.files.images;
			if (!Array.isArray(images)) {
				var temp = images;
				images = [];
				images.push(temp);
			}
			var k = 0;
			images.forEach(element => {
				k = k + 1;
				image_name = now.format("YYYYMMDDHHmmss") + element.name;
				element.mv('./public/uploads/technician/shop/' + image_name);
				file = './public/uploads/technician/shop/' + image_name;
				
                let query = "INSERT INTO `users_attachmentsdtls`(`user_id`,`attachments`) VALUES (?,?)";
                let data = [UserId, image_name];
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
                    if (result) {
                        resolve([]);
                    }
        
                    else {
                        resolve(false);
                    }
        
                });
			});
			resolve([]);
		}
		else {
			resolve([]);
		}
        
		
	});
}

exports.uploadRequestAttachments=async (req,res,srId)=>{
	return new Promise(async function(resolve, reject){
        if (req.files && req.files.images) {
			var images = req.files.images;
			if (!Array.isArray(images)) {
				var temp = images;
				images = [];
				images.push(temp);
			}
			var k = 0;
			images.forEach(element => {
				k = k + 1;
				image_name = now.format("YYYYMMDDHHmmss") + element.name;
				element.mv('./public/uploads/ServiceRequest/' + image_name);
				file = './public/uploads/ServiceRequest/' + image_name;
				
                let query = "INSERT INTO sr_attachmentsdtls (sr_id,attachments) VALUES (?,?)";
                let data = [srId, image_name];
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
                    if (result.affectedRows>0) {
                        resolve(result);
                    }
        
                    else {
                        resolve(false);
                    }
        
                });
			});
			resolve([]);
		}
		else {
			resolve([]);
		}
        
		
	});
}

exports.CheckUniqueEmail = (req) => {
    return new Promise(function (resolve, reject) {
        let query = "SELECT * FROM `users` WHERE is_active=? AND `emailid`=? and role=?";
        let data = ['0', req.body.email,req.body.role];
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
        if(req.body.role==1){  // Consumer
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
    }else{  // Technician
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
            // if (cache.isCache == false) {
            // 	sql.flush();
            // }
            if (result.insertId) {
                let techdtls=await addTechDtls(req,res,result.insertId);
                let techimage=await addTechAttachments(req,res,result.insertId);
                resolve([]);
            }

            else {
                resolve(false);
            }

        });   
    }
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
       

exports.QueryListData = async(query,data,res) => {
    return new Promise( function(resolve , reject ){
        sql.query(query,data,(err, result,cache) => {
            if(err) 
            {
                resolve(false) ;
           }
          if(result){
            
            resolve(result);
            } 
                
            else resolve([]);
        });
      });
};

// exports.UpdateUser = async (obj, req) => {
//         return new Promise(function (resolve, reject) {
//             let query = "UPDATE `users` SET ? WHERE emailid=? and is_active=?";
//             let data = [obj, req.body.email,0];
            
//             sql.query(query, data, async (err, result, cache) => {
//                 console.log(data)
//                 if (err) {
//                     resolve(false) ;
//                 }
//                 if (result.affectedRows) {
//                    resolve(true);
//                 }
//                 else resolve(false);
//             });
//         });
//     };
    
    
