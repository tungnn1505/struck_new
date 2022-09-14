const Constant = require('../constants/constant');
const Modules = require('../constants/modules');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mtblKhachHang = require('../model/khachHang')
var mtblPhuongThucThanhToan = require('../model/phuongthucthanhtoan')
var database = require('../database');
var fs = require('fs');
var path = require('path');
async function deleteRelationshiptblKhachHang(db, listID) {
    await mtblKhachHang(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {
    deleteRelationshiptblKhachHang,
    //  get_detail_tblKhachHang
    detailtblKhachHang: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let tblKhachHang = mtblKhachHang(db);
                    tblKhachHang.belongsTo(mtblPhuongThucThanhToan(db), { foreignKey: 'IDPhuongPhapThanhToan', sourceKey: 'IDPhuongPhapThanhToan', as: 'phuongthutt' })

                    tblKhachHang.findOne({
                        where: { ID: body.id },
                        include: [{
                            model: mtblPhuongThucThanhToan(db),
                            required: false,
                            as: 'phuongthutt'
                        }, ],
                    }).then(data => {
                        if (data) {
                            var obj = {
                                id: data.ID ? Number(data.ID) : null,
                                maKhachHang: data.MaKhachHang ? data.MaKhachHang : '',
                                tenKhachHang: data.TenKhachHang ? data.TenKhachHang : '',
                                tenVietTat: data.TenVietTat ? data.TenVietTat : '',
                                loaiKhachHang: data.LoaiKhachHang ? data.LoaiKhachHang : '',
                                address: data.Address ? data.Address : '',
                                phoneNumber: data.PhoneNumber ? data.PhoneNumber : '',
                                email: data.Email ? data.Email : '',
                                cmt: data.CMT ? data.CMT : '',
                                soDuDauKy: data.SoDuDauKy ? data.SoDuDauKy : null,
                                idPhuongPhapThanhToan: data.IDPhuongPhapThanhToan ? data.IDPhuongPhapThanhToan : '',
                                tenPhuongPhapThanhToan: data.IDPhuongPhapThanhToan ? (data.phuongthutt ? data.phuongthutt.TenThanhToan : '') : '',
                                hanMuc: data.HanMuc ? data.HanMuc : '',
                                startDatePay: data.StartDatePay ? data.StartDatePay : null,
                                endDatePay: data.EndDatePay ? data.EndDatePay : null,
                                deleted: data.Deleted ? data.Deleted : null,
                                createDate: data.CreateDate ? data.CreateDate : null,
                                updateDate: data.UpdateDate ? data.UpdateDate : null,
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
    // add_tblKhachHang
    addtblKhachHang: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblKhachHang(db).findOne({
                        where: {
                            [Op.or]: {
                                MaKhachHang: body.maKhachHang,
                                CMT: body.cmt,
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            mtblKhachHang(db).create({
                                MaKhachHang: body.loaiKhachHang + '.' + body.cmt,
                                TenKhachHang: body.tenKhachHang ? body.tenKhachHang : null,
                                TenVietTat: body.tenVietTat ? body.tenVietTat : null,
                                LoaiKhachHang: body.loaiKhachHang ? body.loaiKhachHang : null,
                                Address: body.address ? body.address : null,
                                PhoneNumber: body.phoneNumber ? body.phoneNumber : null,
                                Email: body.email ? body.email : null,
                                CMT: body.cmt ? body.cmt : null,
                                SoDuDauKy: body.soDuDauKy ? body.soDuDauKy : null,
                                IDPhuongPhapThanhToan: body.idPhuongPhapThanhToan ? body.idPhuongPhapThanhToan : null,
                                HanMuc: body.hanMuc ? body.hanMuc : null,
                                StartDatePay: body.startDatePay ? Modules.formatDatime(body.startDatePay) : null,
                                EndDatePay: body.endDatePay ? Modules.formatDatime(body.endDatePay) : null,
                                Deleted: body.deleted ? body.deleted : null,
                                CreateDate: body.createDate ? Modules.formatDatime(body.createDate) : null,
                                UpdateDate: body.updateDate ? Modules.formatDatime(body.updateDate) : null,
                            }).then(data => {
                                if (data) {
                                    var result = {
                                        data: data,
                                        status: Constant.STATUS.SUCCESS,
                                        message: Constant.MESSAGE.ACTION_SUCCESS,
                                    }
                                    res.json(result);
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
    // update_tblKhachHang
    updatetblKhachHang: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.maKhachHang || body.maKhachHang === '')
                        update.push({ key: 'MaKhachHang', value: body.maKhachHang });
                    if (body.tenKhachHang || body.tenKhachHang === '')
                        update.push({ key: 'TenKhachHang', value: body.tenKhachHang });
                    if (body.tenVietTat || body.tenVietTat === '')
                        update.push({ key: 'TenVietTat', value: body.tenVietTat });
                    if (body.loaiKhachHang || body.loaiKhachHang === '')
                        update.push({ key: 'LoaiKhachHang', value: body.loaiKhachHang });
                    if (body.address || body.address === '')
                        update.push({ key: 'Address', value: body.address });
                    if (body.phoneNumber || body.phoneNumber === '')
                        update.push({ key: 'PhoneNumber', value: body.phoneNumber });
                    if (body.email || body.email === '')
                        update.push({ key: 'Email', value: body.email });
                    if (body.cmt || body.cmt === '')
                        update.push({ key: 'CMT', value: body.cmt });
                    if (body.soDuDauKy || body.soDuDauKy === '') {
                        if (body.soDuDauKy === '')
                            update.push({ key: 'SoDuDauKy', value: null });
                        else
                            update.push({ key: 'SoDuDauKy', value: body.soDuDauKy });
                    }
                    if (body.idPhuongPhapThanhToan || body.idPhuongPhapThanhToan === '') {
                        if (body.idPhuongPhapThanhToan === '')
                            update.push({ key: 'IDPhuongPhapThanhToan', value: null });
                        else
                            update.push({ key: 'IDPhuongPhapThanhToan', value: body.idPhuongPhapThanhToan });
                    }
                    if (body.hanMuc || body.hanMuc === '') {
                        if (body.hanMuc === '')
                            update.push({ key: 'HanMuc', value: null });
                        else
                            update.push({ key: 'HanMuc', value: body.hanMuc });
                    }
                    if (body.startDatePay || body.startDatePay === '') {
                        if (body.startDatePay === '')
                            update.push({ key: 'StartDatePay', value: null });
                        else
                            update.push({ key: 'StartDatePay', value: body.startDatePay });
                    }
                    if (body.endDatePay || body.endDatePay === '') {
                        if (body.endDatePay === '')
                            update.push({ key: 'EndDatePay', value: null });
                        else
                            update.push({ key: 'EndDatePay', value: body.endDatePay });
                    }
                    if (body.deleted || body.deleted === '') {
                        if (body.deleted === '')
                            update.push({ key: 'Deleted', value: null });
                        else
                            update.push({ key: 'Deleted', value: body.deleted });
                    }
                    if (body.createDate || body.createDate === '') {
                        if (body.createDate === '')
                            update.push({ key: 'CreateDate', value: null });
                        else
                            update.push({ key: 'CreateDate', value: body.createDate });
                    }
                    if (body.updateDate || body.updateDate === '') {
                        if (body.updateDate === '')
                            update.push({ key: 'UpdateDate', value: null });
                        else
                            update.push({ key: 'UpdateDate', value: body.updateDate });
                    }
                    mtblKhachHang(db).findOne({
                        where: {
                            [Op.or]: {
                                MaKhachHang: body.maKhachHang,
                                CMT: body.cmt,
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            database.updateTable(update, mtblKhachHang(db), body.id).then(response => {
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
    // delete_tblKhachHang
    deletetblKhachHang: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = body.listID.split(',');
                    await deleteRelationshiptblKhachHang(db, listID);
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
    // get_list_tblKhachHang
    getListtblKhachHang: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var whereOjb = [];
                    let stt = 1;
                    let tblKhachHang = mtblKhachHang(db);
                    tblKhachHang.belongsTo(mtblPhuongThucThanhToan(db), { foreignKey: 'IDPhuongPhapThanhToan', sourceKey: 'IDPhuongPhapThanhToan', as: 'phuongthutt' })
                    tblKhachHang.findAll({
                        offset: Number(body.itemPerPage) * (Number(body.page) - 1),
                        limit: Number(body.itemPerPage),
                        order: [
                            ['ID', 'DESC']
                        ],
                        include: [{
                            model: mtblPhuongThucThanhToan(db),
                            required: false,
                            as: 'phuongthutt'
                        }, ],
                    }).then(async data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                stt: stt,
                                id: element.ID ? Number(element.ID) : null,
                                maKhachHang: element.MaKhachHang ? element.MaKhachHang : '',
                                tenKhachHang: element.TenKhachHang ? element.TenKhachHang : '',
                                tenVietTat: element.TenVietTat ? element.TenVietTat : '',
                                loaiKhachHang: element.LoaiKhachHang ? element.LoaiKhachHang : '',
                                address: element.Address ? element.Address : '',
                                phoneNumber: element.PhoneNumber ? element.PhoneNumber : '',
                                email: element.Email ? element.Email : '',
                                cmt: element.CMT ? element.CMT : '',
                                soDuDauKy: element.SoDuDauKy ? element.SoDuDauKy : null,
                                idPhuongPhapThanhToan: element.IDPhuongPhapThanhToan ? element.IDPhuongPhapThanhToan : '',
                                tenPhuongPhapThanhToan: element.IDPhuongPhapThanhToan ? (element.phuongthutt ? element.phuongthutt.TenThanhToan : '') : '',
                                hanMuc: element.HanMuc ? element.HanMuc : '',
                                startDatePay: element.StartDatePay ? element.StartDatePay : null,
                                endDatePay: element.EndDatePay ? element.EndDatePay : null,
                                deleted: element.Deleted ? element.Deleted : null,
                                createDate: element.CreateDate ? element.CreateDate : null,
                                updateDate: element.UpdateDate ? element.UpdateDate : null,
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await mtblKhachHang(db).count()
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
    // get_list_name_tblKhachHang
    getListNametblKhachHang: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblKhachHang(db).findAll().then(data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                id: Number(element.ID),
                                maKhachHang: element.MaKhachHang ? element.MaKhachHang : '',
                                tenKhachHang: element.TenKhachHang ? element.TenKhachHang : '',
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
    },
}