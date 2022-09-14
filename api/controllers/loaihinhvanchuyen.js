const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mLoaiHinhVanChuyen = require('../model/loaiHinhVanChuyen')
var database = require('../database');
async function deleteRelationshipLoaiHinhVanChuyen(db, listID) {
    await mLoaiHinhVanChuyen(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {
    deleteRelationshipLoaiHinhVanChuyen,
    //  get_detail_LoaiHinhVanChuyen
    detailLoaiHinhVanChuyen: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mLoaiHinhVanChuyen(db).findOne({ where: { ID: body.id } }).then(data => {
                        if (data) {
                            var obj = {
                                id: Number(data.ID),
                                tenLoaiHinh: data.TenLoaiHinh ? data.TenLoaiHinh : '',
                                tenVietTat: data.TenVietTat ? data.TenVietTat : '',
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
    // add_LoaiHinhVanChuyen
    addLoaiHinhVanChuyen: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mLoaiHinhVanChuyen(db).findOne({
                        where: {
                            [Op.or]: {
                                TenVietTat: body.tenVietTat
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            mLoaiHinhVanChuyen(db).create({
                                TenVietTat: body.tenVietTat ? body.tenVietTat : '',
                                TenLoaiHinh: body.tenLoaiHinh ? body.tenLoaiHinh : '',
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
    // update_LoaiHinhVanChuyen
    updateLoaiHinhVanChuyen: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.tenVietTat || body.tenVietTat === '')
                        update.push({ key: 'TenVietTat', value: body.tenVietTat });
                    if (body.tenLoaiHinh || body.tenLoaiHinh === '')
                        update.push({ key: 'TenLoaiHinh', value: body.tenLoaiHinh });
                    mLoaiHinhVanChuyen(db).findOne({
                        where: {
                            [Op.or]: {
                                TenVietTat: body.tenVietTat,
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            database.updateTable(update, mLoaiHinhVanChuyen(db), body.id).then(response => {
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
    // delete_LoaiHinhVanChuyen
    deleteLoaiHinhVanChuyen: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = body.listID.split(',');
                    await deleteRelationshipLoaiHinhVanChuyen(db, listID);
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
    // get_list_LoaiHinhVanChuyen
    getListLoaiHinhVanChuyen: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var whereOjb = [];
                    let stt = 1;
                    mLoaiHinhVanChuyen(db).findAll({
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
                                tenLoaiHinh: data.TenLoaiHinh ? data.TenLoaiHinh : '',
                                tenVietTat: data.TenVietTat ? data.TenVietTat : '',
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await mLoaiHinhVanChuyen(db).count()
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
}