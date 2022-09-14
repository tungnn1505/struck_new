const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mCustomerDB = require('../model/customerDB')
var database = require('../database');
async function deleteRelationshipCustomerDB(db, listID) {
    await mCustomerDB(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {
    deleteRelationshipCustomerDB,
    //  get_detail_CustomerDBapi
    detailCustomerDB: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mCustomerDB(db).findOne({ where: { ID: body.id } }).then(data => {
                        if (data) {
                            var obj = {
                                id: Number(data.ID),
                                userName: data.UserName ? data.UserName : '',
                                password: data.Password ? data.Password : '',
                                nameDB: data.NameDB ? data.NameDB : '',
                                status: data.Status ? data.Status : '',
                                keyLicense: data.KeyLicense ? data.KeyLicense : '',
                                keyConnect: data.KeyConnect ? data.KeyConnect : '',
                            }
                            var result = {
                                obj: obj,
                                status: Constant.STATUS.SUCCESS,
                                message: Constant.MESSAGE.ACTION_SUCCESS,
                            }
                            res.json(result);
                        } else {
                            res.json(Result.NO_DATA_RESULT)

                        }

                    })
                } catch (error) {
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // add_CustomerDBapi
    addCustomerDB: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mCustomerDB(db).findOne({
                        where: {
                            [Op.or]: {
                                UserName: body.userName,
                                NameDB: body.nameDB
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);

                        else {
                            mCustomerDB(db).create({
                                IDCustomer: body.idCustomer ? body.idCustomer : null,
                                UserName: body.userName ? body.userName : '',
                                Password: body.password ? body.password : '',
                                NameDB: body.nameDB ? body.nameDB : '',
                                Status: body.status ? body.status : '',
                                KeyLicense: body.keyLicense ? body.keyLicense : '',
                                KeyConnect: body.keyConnect ? body.keyConnect : '',
                            }).then(data => {
                                var result = {
                                    status: Constant.STATUS.SUCCESS,
                                    message: Constant.MESSAGE.ACTION_SUCCESS,
                                }
                                res.json(result);
                            })
                        }
                    })
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // update_CustomerDBapi
    updateCustomerDB: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.userName || body.userName === '')
                        update.push({ key: 'UserName', value: body.userName });
                    if (body.password || body.password === '')
                        update.push({ key: 'Password', value: body.password });
                    if (body.nameDB || body.nameDB === '')
                        update.push({ key: 'NameDB', value: body.nameDB });
                    if (body.status || body.status === '')
                        update.push({ key: 'Status', value: body.status });
                    if (body.keyLicense || body.keyLicense === '')
                        update.push({ key: 'KeyLicense', value: body.keyLicense });
                    if (body.keyConnect || body.keyConnect === '')
                        update.push({ key: 'KeyConnect', value: body.keyConnect });
                    if (body.idCustomer || body.idCustomer === '') {
                        if (body.idCustomer === '')
                            update.push({ key: 'IDCustomer', value: null });
                        else
                            update.push({ key: 'IDCustomer', value: body.idCustomer });
                    }
                    mCustomerDB(db).findOne({
                        where: {
                            [Op.or]: {
                                UserName: body.userName,
                                NameDB: body.nameDB,
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            database.updateTable(update, mCustomerDB(db), body.id).then(response => {
                                if (response == 1) {
                                    res.json(Result.ACTION_SUCCESS);
                                } else {
                                    res.json(Result.SYS_ERROR_RESULT);
                                }
                            })
                        }
                    })
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // delete_CustomerDBapi
    deleteCustomerDB: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = JSON.parse(body.listID);
                    await deleteRelationshipCustomerDB(db, listID);
                    var result = {
                        status: Constant.STATUS.SUCCESS,
                        message: Constant.MESSAGE.ACTION_SUCCESS,
                    }
                    res.json(result);
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // get_list_CustomerDBapi
    getListCustomerDB: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let stt = 1;
                    mCustomerDB(db).findAll({
                        offset: Number(body.itemPerPage) * (Number(body.page) - 1),
                        limit: Number(body.itemPerPage),
                        // where: whereOjb,
                        order: [
                            ['ID', 'DESC']
                        ],
                    }).then(async data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                stt: stt,
                                id: Number(element.ID),
                                userName: element.UserName ? element.UserName : '',
                                password: element.Password ? element.Password : '',
                                nameDB: element.NameDB ? element.NameDB : '',
                                status: element.Status ? element.Status : '',
                                keyLicense: element.KeyLicense ? element.KeyLicense : '',
                                keyConnect: element.KeyConnect ? element.KeyConnect : '',
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await mCustomerDB(db).count()
                        var result = {
                            array: array,
                            status: Constant.STATUS.SUCCESS,
                            message: Constant.MESSAGE.ACTION_SUCCESS,
                            all: count
                        }
                        res.json(result);
                    })

                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    }
}