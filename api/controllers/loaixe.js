const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mLoaiXe = require('../model/loaiXe')
var database = require('../database');
async function deleteRelationshipLoaiXe(db, listID) {
    await mLoaiXe(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {
    deleteRelationshipLoaiXe,
    //  get_detail_LoaiXe
    detailLoaiXe: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mLoaiXe(db).findOne({ where: { ID: body.id } }).then(data => {
                        if (data) {
                            var obj = {
                                id: Number(data.ID),
                                name: data.Name ? data.Name : '',
                                note: data.Note ? data.Note : '',
                                deleted: data.Deleted ? data.Deleted : null,
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
    // add_LoaiXe
    addLoaiXe: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mLoaiXe(db).findOne({
                        where: {
                            [Op.or]: {
                                Name: body.name
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            mLoaiXe(db).create({
                                Note: body.note ? body.note : '',
                                Name: body.name ? body.name : '',
                                Deleted: body.deleted ? body.deleted : null,
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
    // update_LoaiXe
    updateLoaiXe: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.note || body.note === '')
                        update.push({ key: 'Note', value: body.note });
                    if (body.name || body.name === '')
                        update.push({ key: 'Name', value: body.name });
                    if (body.deleted || body.deleted === '') {
                        if (body.deleted === '')
                            update.push({ key: 'Deleted', value: null });
                        else
                            update.push({ key: 'Deleted', value: body.deleted });
                    }
                    mLoaiXe(db).findOne({
                        where: {
                            [Op.or]: {
                                Name: body.name,
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            database.updateTable(update, mLoaiXe(db), body.id).then(response => {
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
    // delete_LoaiXe
    deleteLoaiXe: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = body.listID.split(',');
                    await deleteRelationshipLoaiXe(db, listID);
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
    // get_list_LoaiXe
    getListLoaiXe: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var whereOjb = [];
                    let stt = 1;
                    mLoaiXe(db).findAll({
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
                                name: element.Name ? element.Name : '',
                                note: element.Note ? element.Note : '',
                                deleted: element.Deleted ? element.Deleted : '',
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await mLoaiXe(db).count()
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
    // get_list_name_LoaiXe
    getListNameLoaiXe: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mLoaiXe(db).findAll().then(data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                id: Number(element.ID),
                                name: element.Name ? element.Name : '',
                                note: element.Note ? element.Note : '',
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