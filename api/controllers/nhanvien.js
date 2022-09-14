const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mNhanVien = require('../model/nhanVien')
var database = require('../database');
async function deleteRelationshipNhanVien(db, listID) {
    await mNhanVien(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {
    deleteRelationshipNhanVien,
    //  get_detail_NhanVien
    detailNhanVien: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mNhanVien(db).findOne({ where: { ID: body.id } }).then(data => {
                        if (data) {
                            var obj = {
                                id: Number(data.ID),
                                idLoaiNhanVien: data.IDLoaiNhanVien ? data.IDLoaiNhanVien : null,
                                tenNhanVien: data.TenNhanVien ? data.TenNhanVien : '',
                                maNhanVien: data.MaNhanVien ? data.MaNhanVien : '',
                                phoneNumber: data.PhoneNumber ? data.PhoneNumber : '',
                                birthday: data.Birthday ? data.Birthday : null,
                                gender: data.Gender ? data.Gender : '',
                                address: data.Address ? data.Address : '',
                                username: data.Username ? data.Username : '',
                                password: data.Password ? data.Password : '',
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
    // add_NhanVien
    addNhanVien: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mNhanVien(db).findOne({
                        where: {
                            [Op.or]: {
                                MaNhanVien: body.maNhanVien
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            mNhanVien(db).create({
                                IDLoaiNhanVien: body.idLoaiNhanVien ? body.idLoaiNhanVien : null,
                                TenNhanVien: body.tenNhanVien ? body.tenNhanVien : '',
                                MaNhanVien: body.maNhanVien ? body.maNhanVien : '',
                                PhoneNumber: body.phoneNumber ? body.phoneNumber : '',
                                Birthday: body.birthday ? body.birthday : null,
                                Gender: body.gender ? body.gender : '',
                                Address: body.address ? body.address : '',
                                Username: body.username ? body.username : '',
                                Password: body.password ? body.password : '',
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
    // update_NhanVien
    updateNhanVien: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.idLoaiNhanVien || body.idLoaiNhanVien === '') {
                        if (body.idLoaiNhanVien === '')
                            update.push({ key: 'IDLoaiNhanVien', value: null });
                        else
                            update.push({ key: 'IDLoaiNhanVien', value: body.idLoaiNhanVien });
                    }
                    if (body.tenNhanVien || body.tenNhanVien === '')
                        update.push({ key: 'TenNhanVien', value: body.tenNhanVien });
                    if (body.maNhanVien || body.maNhanVien === '')
                        update.push({ key: 'MaNhanVien', value: body.maNhanVien });
                    if (body.phoneNumber || body.phoneNumber === '')
                        update.push({ key: 'PhoneNumber', value: body.phoneNumber });
                    if (body.birthday || body.birthday === '') {
                        if (body.birthday === '')
                            update.push({ key: 'Birthday', value: null });
                        else
                            update.push({ key: 'Birthday', value: body.birthday });
                    }
                    if (body.gender || body.gender === '')
                        update.push({ key: 'Gender', value: body.gender });
                    if (body.address || body.address === '')
                        update.push({ key: 'Address', value: body.address });
                    if (body.username || body.username === '')
                        update.push({ key: 'Username', value: body.username });
                    if (body.password || body.password === '')
                        update.push({ key: 'Password', value: body.password });
                    mNhanVien(db).findOne({
                        where: {
                            [Op.or]: {
                                MaNhanVien: body.maNhanVien,
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
    // delete_NhanVien
    deleteNhanVien: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = body.listID.split(',');
                    await deleteRelationshipNhanVien(db, listID);
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
    // get_list_NhanVien
    getListNhanVien: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var whereOjb = [];
                    let stt = 1;
                    mNhanVien(db).findAll({
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
                                idLoaiNhanVien: element.IDLoaiNhanVien ? element.IDLoaiNhanVien : null,
                                tenNhanVien: element.TenNhanVien ? element.TenNhanVien : '',
                                maNhanVien: element.MaNhanVien ? element.MaNhanVien : '',
                                phoneNumber: element.PhoneNumber ? element.PhoneNumber : '',
                                birthday: element.Birthday ? element.Birthday : null,
                                gender: element.Gender ? element.Gender : '',
                                address: element.Address ? element.Address : '',
                                username: element.Username ? element.Username : '',
                                password: element.Password ? element.Password : '',
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await mNhanVien(db).count({ where: whereOjb, })
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
    // get_list_name_NhanVien
    getListNameNhanVien: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mNhanVien(db).findAll().then(data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                id: Number(element.ID),
                                tenNhanVien: element.TenNhanVien ? element.TenNhanVien : '',
                                maNhanVien: element.MaNhanVien ? element.MaNhanVien : '',
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