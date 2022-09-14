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
    getListCustomerDB: (req, res) => {
        let params = req.query;
        database.connectDBCustomer().then(async custommerDB => {
            if (custommerDB) {
                try {
                    var stt = 1;
                    let tblCustomerDB = mtblCustomerDB(custommerDB);
                    tblCustomerDB.findAll({
                        order: [
                            ['ID', 'DESC']
                        ],
                        offset: Number(params.itemPerPage) * (Number(params.page) - 1),
                        limit: Number(params.itemPerPage),
                    }).then(async data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                stt: stt,
                                id: Number(element.ID),
                                nameDB: element.NameDB ? element.NameDB : '',
                                userName: element.UserName ? element.UserName : '',
                                password: element.Password ? element.Password : '',
                                keyLicense: element.KeyLicense ? element.KeyLicense : '',
                                keyConnect: element.KeyConnect ? element.KeyConnect : '',
                                status: element.Status ? element.Status : '',
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await tblCustomerDB.count()
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
    },
    createDatabase: (req, res) => {
        let body = req.query;
        database.connectDBCustomer().then(async db => {
            if (db) {
                const path = 'D:/workProject/struck_nodejs_new/struck.text';
                fs.readFile(path, { encoding: 'utf-8' }, async function(err, data) {
                    let txtCreateDB = data;
                    let customerID = null
                    await mtblCustomer(db).create({
                        Name: body.name ? body.name : '',
                        ShortName: body.shortName ? body.shortName : '',
                        Address: body.address ? body.address : '',
                        Email: body.email ? body.email : '',
                        Fax: body.fax ? body.fax : '',
                        Phone: body.phone ? body.phone : '',
                        ContactName: body.contactName ? body.contactName : '',
                        ContactPhone: body.contactPhone ? body.contactPhone : '',
                    }).then(data => {
                        customerID = data.ID ? data : null
                    }).catch(err => {
                        console.log(err + '');
                        return res.json(Result.CREATE_DB_FAIL)
                    })
                    await mtblCustomerDB(db).create({
                        IDCustomer: customerID,
                        KeyConnect: body.keyConnect ? body.keyConnect : '',
                        UserName: body.userName ? body.userName : '',
                        KeyLicense: body.keyLicense ? body.keyLicense : '',
                        Status: body.status ? body.status : '',
                        NameDB: body.nameDB ? body.nameDB : '',
                        Password: body.password ? body.password : '',
                    }).catch(err => {
                        console.log(err + '');
                        return res.json(Result.CREATE_DB_FAIL)
                    })

                    await db.query('CREATE DATABASE STRUCK_TEST_DB;').catch(err => {
                        console.log(err + '');
                        return res.json(Result.CREATE_DB_FAIL)
                    });
                    // db.query(txtCreateDB).then(mess => {
                    //     console.log(mess);
                    // })
                });
            } else {
                res.json(Result.CREATE_DB_FAIL)
            }
        })
    },
}