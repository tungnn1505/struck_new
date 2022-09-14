const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mLoaiNhanVien = require('../model/loaiNhanVien')
var mNhanVien = require('../model/nhanVien')
var database = require('../database');
async function deleteRelationshipLoaiNhanVien(db, listID) {
    await mNhanVien(db).update({
        IDLoaiNhanVien: null
    }, {
        where: {
            IDLoaiNhanVien: {
                [Op.in]: listID
            }
        }
    })
    await mLoaiNhanVien(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {
    deleteRelationshipLoaiNhanVien,
    //  get_detail_LoaiNhanVien
    detailLoaiNhanVien: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mLoaiNhanVien(db).findOne({ where: { ID: body.id } }).then(data => {
                        if (data) {
                            var obj = {
                                id: Number(data.ID),
                                maLoaiNhanVien: data.MaLoaiNhanVien ? data.MaLoaiNhanVien : '',
                                tenLoaiNhanVien: data.TenLoaiNhanVien ? data.TenLoaiNhanVien : '',
                                ghiChu: data.GhiChu ? data.GhiChu : '',
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
    // add_LoaiNhanVien
    addLoaiNhanVien: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mLoaiNhanVien(db).findOne({
                        where: {
                            [Op.or]: {
                                MaLoaiNhanVien: body.maLoaiNhanVien
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            mLoaiNhanVien(db).create({
                                MaLoaiNhanVien: body.maLoaiNhanVien ? body.maLoaiNhanVien : '',
                                TenLoaiNhanVien: body.tenLoaiNhanVien ? body.tenLoaiNhanVien : '',
                                GhiChu: body.ghiChu ? body.ghiChu : '',
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
    // update_LoaiNhanVien
    updateLoaiNhanVien: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.tenLoaiNhanVien || body.tenLoaiNhanVien === '')
                        update.push({ key: 'TenLoaiNhanVien', value: body.tenLoaiNhanVien });
                    if (body.maLoaiNhanVien || body.maLoaiNhanVien === '')
                        update.push({ key: 'MaLoaiNhanVien', value: body.maLoaiNhanVien });
                    if (body.ghiChu || body.ghiChu === '')
                        update.push({ key: 'GhiChu', value: body.ghiChu });
                    mNhanVien(db).findOne({
                        where: {
                            [Op.or]: {
                                TenLoaiNhanVien: body.tenLoaiNhanVien,
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            database.updateTable(update, mNhanVien(db), body.id).then(response => {
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
    // delete_LoaiNhanVien
    deleteLoaiNhanVien: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = body.listID.split(',');
                    await deleteRelationshipLoaiNhanVien(db, listID);
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
    // get_list_LoaiNhanVien
    getListLoaiNhanVien: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var whereOjb = [];
                    let stt = 1;
                    mLoaiNhanVien(db).findAll({
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
                                maLoaiNhanVien: data.MaLoaiNhanVien ? data.MaLoaiNhanVien : '',
                                tenLoaiNhanVien: data.TenLoaiNhanVien ? data.TenLoaiNhanVien : '',
                                ghiChu: data.GhiChu ? data.GhiChu : '',
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await mLoaiNhanVien(db).count()
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
    // get_list_name_LoaiNhanVien
    getListNameLoaiNhanVien: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mLoaiNhanVien(db).findAll().then(data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                id: Number(element.ID),
                                tenLoaiNhanVien: element.TenLoaiNhanVien ? element.TenLoaiNhanVien : '',
                                maLoaiNhanVien: element.MaLoaiNhanVien ? element.MaLoaiNhanVien : '',
                            }
                            array.push(obj);
                        });
                        var result = {
                            array: array,
                            status: Constant.STATUS.SUCCESS,
                            message: Constant.MESSAGE.ACTION_SUCCESS,
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