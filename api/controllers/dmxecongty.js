const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mDMXeCongTy = require('../model/dmXeCongTy')
var database = require('../database');
async function deleteRelationshipDMXeCongTy(db, listID) {
    await mDMXeCongTy(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {
    deleteRelationshipDMXeCongTy,
    //  get_detail_DMXeCongTy
    detailDMXeCongTy: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mDMXeCongTy(db).findOne({ where: { ID: body.id } }).then(data => {
                        if (data) {
                            var obj = {
                                id: Number(data.ID),
                                bienSoXe: data.BienSoXe ? data.BienSoXe : '',
                                loaiDauKeo: data.LoaiDauKeo ? data.LoaiDauKeo : '',
                                soRoMooc: data.SoRoMooc ? data.SoRoMooc : '',
                                loaiSoMi: data.LoaiSoMi ? data.LoaiSoMi : '',
                                gps: data.GPS ? data.GPS : '',
                                tenLaiXe: data.TenLaiXe ? data.TenLaiXe : '',
                                soDienThoai: data.SoDienThoai ? data.SoDienThoai : '',
                                soCMT: data.SoCMT ? data.SoCMT : '',
                                soBangLai: data.SoBangLai ? data.SoBangLai : '',
                                soDangKiem: data.SoDangKiem ? data.SoDangKiem : '',
                                ngayHetHanDK: data.NgayHetHanDK ? data.NgayHetHanDK : '',
                                soBHTNDS: data.SoBHTNDS ? data.SoBHTNDS : '',
                                ngayHetHanBHTNDS: data.NgayHetHanBHTNDS ? data.NgayHetHanBHTNDS : '',
                                dinhMuc: data.DinhMuc ? data.DinhMuc : null,
                                thongSoKyThuat: data.ThongSoKyThuat ? data.ThongSoKyThuat : '',
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
    // add_DMXeCongTy
    addDMXeCongTy: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mDMXeCongTy(db).findOne({
                        where: {
                            [Op.or]: {
                                BienSoXe: body.bienSoXe
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            mDMXeCongTy(db).create({
                                BienSoXe: body.bienSoXe ? body.bienSoXe : '',
                                LoaiDauKeo: body.loaiDauKeo ? body.loaiDauKeo : '',
                                SoRoMooc: body.soRoMooc ? body.soRoMooc : '',
                                LoaiSoMi: body.loaiSoMi ? body.loaiSoMi : '',
                                GPS: body.gps ? body.gps : '',
                                TenLaiXe: body.tenLaiXe ? body.tenLaiXe : '',
                                SoDienThoai: body.soDienThoai ? body.soDienThoai : '',
                                SoCMT: body.soCMT ? body.soCMT : '',
                                SoBangLai: body.soBangLai ? body.soBangLai : '',
                                SoDangKiem: body.soDangKiem ? body.soDangKiem : '',
                                NgayHetHanDK: body.ngayHetHanDK ? body.ngayHetHanDK : '',
                                SoBHTNDS: body.soBHTNDS ? body.soBHTNDS : '',
                                NgayHetHanBHTNDS: body.ngayHetHanBHTNDS ? body.ngayHetHanBHTNDS : '',
                                DinhMuc: body.dinhMuc ? body.dinhMuc : null,
                                ThongSoKyThuat: body.thongSoKyThuat ? body.thongSoKyThuat : '',
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
    // update_DMXeCongTy
    updateDMXeCongTy: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.bienSoXe || body.bienSoXe === '')
                        update.push({ key: 'BienSoXe', value: body.bienSoXe });
                    if (body.loaiDauKeo || body.loaiDauKeo === '')
                        update.push({ key: 'LoaiDauKeo', value: body.loaiDauKeo });
                    if (body.soRoMooc || body.soRoMooc === '')
                        update.push({ key: 'SoRoMooc', value: body.soRoMooc });
                    if (body.loaiSoMi || body.loaiSoMi === '')
                        update.push({ key: 'LoaiSoMi', value: body.loaiSoMi });
                    if (body.gps || body.gps === '')
                        update.push({ key: 'GPS', value: body.gps });
                    if (body.tenLaiXe || body.tenLaiXe === '')
                        update.push({ key: 'TenLaiXe', value: body.tenLaiXe });
                    if (body.soDienThoai || body.soDienThoai === '')
                        update.push({ key: 'SoDienThoai', value: body.soDienThoai });
                    if (body.soCMT || body.soCMT === '')
                        update.push({ key: 'SoCMT', value: body.soCMT });
                    if (body.soBangLai || body.soBangLai === '')
                        update.push({ key: 'SoBangLai', value: body.soBangLai });
                    if (body.soDangKiem || body.soDangKiem === '')
                        update.push({ key: 'SoDangKiem', value: body.soDangKiem });
                    if (body.ngayHetHanDK || body.ngayHetHanDK === '')
                        update.push({ key: 'NgayHetHanDK', value: body.ngayHetHanDK });
                    if (body.soBHTNDS || body.soBHTNDS === '')
                        update.push({ key: 'SoBHTNDS', value: body.soBHTNDS });
                    if (body.ngayHetHanBHTNDS || body.ngayHetHanBHTNDS === '')
                        update.push({ key: 'NgayHetHanBHTNDS', value: body.ngayHetHanBHTNDS });
                    if (body.thongSoKyThuat || body.thongSoKyThuat === '')
                        update.push({ key: 'ThongSoKyThuat', value: body.thongSoKyThuat });
                    if (body.dinhMuc || body.dinhMuc === '') {
                        if (body.dinhMuc === '')
                            update.push({ key: 'DinhMuc', value: null });
                        else
                            update.push({ key: 'DinhMuc', value: body.dinhMuc });
                    }
                    mDMXeCongTy(db).findOne({
                        where: {
                            [Op.or]: {
                                BienSoXe: body.bienSoXe,
                            }
                        }
                    }).then(data => {
                        if (data)
                            res.json(Result.ALERADY_EXIST_DATA);
                        else {
                            database.updateTable(update, mDMXeCongTy(db), body.id).then(response => {
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
    // delete_DMXeCongTy
    deleteDMXeCongTy: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = body.listID.split(',');
                    await deleteRelationshipDMXeCongTy(db, listID);
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
    // get_list_DMXeCongTy
    getListDMXeCongTy: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var whereOjb = [];
                    let stt = 1;
                    mDMXeCongTy(db).findAll({
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
                                bienSoXe: element.BienSoXe ? element.BienSoXe : '',
                                loaiDauKeo: element.LoaiDauKeo ? element.LoaiDauKeo : '',
                                soRoMooc: element.SoRoMooc ? element.SoRoMooc : '',
                                loaiSoMi: element.LoaiSoMi ? element.LoaiSoMi : '',
                                gps: element.GPS ? element.GPS : '',
                                tenLaiXe: element.TenLaiXe ? element.TenLaiXe : '',
                                soDienThoai: element.SoDienThoai ? element.SoDienThoai : '',
                                soCMT: element.SoCMT ? element.SoCMT : '',
                                soBangLai: element.SoBangLai ? element.SoBangLai : '',
                                soDangKiem: element.SoDangKiem ? element.SoDangKiem : '',
                                ngayHetHanDK: element.NgayHetHanDK ? element.NgayHetHanDK : '',
                                soBHTNDS: element.SoBHTNDS ? element.SoBHTNDS : '',
                                ngayHetHanBHTNDS: element.NgayHetHanBHTNDS ? element.NgayHetHanBHTNDS : '',
                                dinhMuc: element.DinhMuc ? element.DinhMuc : null,
                                thongSoKyThuat: element.ThongSoKyThuat ? element.ThongSoKyThuat : '',
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await mDMXeCongTy(db).count()
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
    // get_list_name_DMXeCongTy
    getListNameDMXeCongTy: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mDMXeCongTy(db).findAll().then(data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                id: Number(element.ID),
                                bienSoXe: element.BienSoXe ? element.BienSoXe : '',
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