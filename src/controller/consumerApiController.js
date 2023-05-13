const moment = require('moment');
const sql = require('../config/conn');
const UserModel = require('../models/userModel');
const CommonModel = require('../models/commonModel')
const StorageController = require('./storageController')


module.exports = {
    getallAppliances: async (req, res) => {
        const appliancesResult = await UserModel.FetchAllAppliances(req, res);
        if (appliancesResult.length > 0) {
            res.status(200)
                .send({
                    status: 200,
                    message: 'Appliances Fetched Successfully..!',
                    data: appliancesResult
                })
        } else {
            res.status(400)
                .send({
                    status: 400,
                    message: 'Appliances Not Fetched Successfully..!',
                    data: []
                })
        }

    },

    serviceApplianceDetails: async (req, res) => {
        const appliancesDetails = await CommonModel.getApplianceDetails(req, res);
        if (appliancesDetails.length > 0) {
            let query = "SELECT cd.id AS capacity_id,cd.type,cd.variants FROM capacity_details cd WHERE cd.type = ? and cd.`status`=?";
            let data = [appliancesDetails[0].capacity, '0'];
            sql.query(query, data, async (err, capacityResult) => {
                if (err) {
                    res.status(500)
                        .send({
                            status: 500,
                            message: 'Internal Server Error..!',
                            data: []
                        })
                } else if (capacityResult.length > 0) {
                    // Getting the Damages Lists for all appliances
                    const damageLists = await CommonModel.getDamageLists(req, res);
                    // Getting the Brand Lists for all appliances
                    const brandLists = await CommonModel.getApplianceBrandsbyId(req, res);
                    // Getting the Model Lists for all appliances
                    const modelLists = await CommonModel.getApplianceModelsbyId(req, res);

                    appliancesDetails[0].capacityDetails = capacityResult;
                    appliancesDetails[0].damageLists = damageLists;
                    appliancesDetails[0].brandLists = brandLists;
                    appliancesDetails[0].modelLists = modelLists;
                    res.status(200)
                        .send({
                            status: 200,
                            message: 'Appliances Details Fetched Successfully..!',
                            data: appliancesDetails
                        })
                } else {
                    res.status(200)
                        .send({
                            status: 200,
                            message: 'Appliances Details Fetched Successfully..!',
                            data: appliancesDetails
                        })
                }

            });
        } else {
            res.status(400)
                .send({
                    status: 400,
                    message: 'Appliances Details Not Fetched ..!',
                    data: []
                })
        }

    },

    insertServiceRequest: async (req, res) => {
        //const appliancesDetails = await CommonModel.getApplianceDetails(req, res);
            let query = "insert into sr_details (user_id,tech_id,service_id,tech_visit,slots,damage_type,damage_description,brand_id,model_no,variants,warranty_status,warranty_limit,labour_fee) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
            let data = [req.body.user_id,req.body.tech_id,req.body.service_id,req.body.tech_visit,req.body.slots,req.body.damage_id,req.body.damage_description,req.body.brand,req.body.model_number,req.body.variants,req.body.warranty_status,req.body.warranty_limit,req.body.labour_fee];
            sql.query(query, data, async (err, result) => {
                if (err) {
                    res.status(500)
                        .send({
                            status: 500,
                            message: 'Internal Server Error..!',
                            data: []
                        })
                } else if (result.affectedRows > 0) {
                    if(req.files){
                        const resp = StorageController.UploadAttachments(req.files.attachments, result.insertId)
                    } 
                    res.status(200)
                        .send({
                            status: 200,
                            message: 'Service Request Created Successfully..!',
                            data: []
                        })
                } else {
                    res.status(200)
                        .send({
                            status: 200,
                            message: 'Service Request Not Created..!',
                            data: []
                        })
                }

            });
        

       

    }
}


