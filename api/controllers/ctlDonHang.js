const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mDonHang = require('../model/donhang');
var mLoaiHinhVanChuyen = require('../model/loaiHinhVanChuyen');
var mtblKhachHang = require('../model/khachHang');
var mNhanVien = require('../model/nhanVien');
var database = require('../database');
var mLoaiVo = require('../model/loaiVo');
var mHangTau = require('../model/hangTau');
async function deleteRelationshipDonHang(db, listID) {
    await mDonHang(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {
    deleteRelationshipDonHang,
    //  get_detail_DonHang
    detailDonHang: (req, res) => {
        let body = req.query;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let donHang = mDonHang(db);
                    donHang.belongsTo(mLoaiHinhVanChuyen(db), { foreignKey: 'IDLoaiHinhVanChuyen', sourceKey: 'IDLoaiHinhVanChuyen', as: 'loaiHinhVanChuyen' })
                    donHang.belongsTo(mtblKhachHang(db), { foreignKey: 'IDKhachHang', sourceKey: 'IDKhachHang', as: 'khachHang' })
                    donHang.belongsTo(mtblKhachHang(db), { foreignKey: 'IDNhaXe', sourceKey: 'IDNhaXe', as: 'nhaXe' })
                    donHang.belongsTo(mNhanVien(db), { foreignKey: 'IDNVCSKH', sourceKey: 'IDNVCSKH', as: 'nvcskh' })
                    donHang.belongsTo(mNhanVien(db), { foreignKey: 'IDNVKH', sourceKey: 'IDNVKH', as: 'nvkh' })
                    donHang.belongsTo(mLoaiVo(db), { foreignKey: 'IDLoaiVo', sourceKey: 'IDLoaiVo', as: 'loaiVo' })
                    donHang.belongsTo(mHangTau(db), { foreignKey: 'IDHangTau', sourceKey: 'IDHangTau', as: 'hangTau' })
                    donHang.findOne({ where: { ID: body.id } }, {
                        include: [{
                                model: mLoaiHinhVanChuyen(db),
                                required: false,
                                as: 'loaiHinhVanChuyen'
                            },
                            {
                                model: mtblKhachHang(db),
                                required: false,
                                as: 'khachHang'
                            },
                            {
                                model: mtblKhachHang(db),
                                required: false,
                                as: 'nhaXe'
                            },
                            {
                                model: mNhanVien(db),
                                required: false,
                                as: 'nvcskh'
                            },
                            {
                                model: mNhanVien(db),
                                required: false,
                                as: 'nvkh'
                            },
                            {
                                model: mLoaiVo(db),
                                required: false,
                                as: 'loaiVo'
                            },
                            {
                                model: mHangTau(db),
                                required: false,
                                as: 'hangTau'
                            },
                        ],
                    }).then(data => {
                        if (data) {
                            var obj = {
                                id: data.ID,
                                idLoaiHinhVanChuyen: data.IDLoaiHinhVanChuyen ? data.IDLoaiHinhVanChuyen : null,
                                objLoaiHinhVanChuyen: data.IDLoaiHinhVanChuyen ? data.loaiHinhVanChuyen : null,
                                idKhachHang: data.IDKhachHang ? data.IDKhachHang : null,
                                objKhachHang: data.IDKhachHang ? data.khachHang : null,
                                idNhaXe: data.IDNhaXe ? data.IDNhaXe : null,
                                objNhaXe: data.IDNhaXe ? data.nhaXe : null,
                                idNVCSKH: data.IDNVCSKH ? data.IDNVCSKH : null,
                                objNVCSKH: data.IDNVCSKH ? data.nvcskh : null,
                                idNVKH: data.IDNVKH ? data.IDNVKH : null,
                                objNVKH: data.IDNVKH ? data.nvkh : null,
                                codeOrder: data.CodeOrder ? data.CodeOrder : '',
                                noVo: data.NoVo ? data.NoVo : null,
                                idLoaiVo: data.IDLoaiVo ? data.IDLoaiVo : null,
                                objLoaiVo: data.IDLoaiVo ? data.loaiVo : null,
                                trongLuong: data.TrongLuong ? data.TrongLuong : '',
                                idHangTau: data.IDHangTau ? data.IDHangTau : '',
                                objHangTau: data.IDHangTau ? data.hangTau : '',
                                ngayDong: data.NgayDong ? data.NgayDong : '',
                                gioDong: data.GioDong ? data.GioDong : '',
                                noiDong: data.NoiDong ? data.NoiDong : '',
                                ngayTra: data.NgayTra ? data.NgayTra : '',
                                gioTra: data.GioTra ? data.GioTra : '',
                                noiTra: data.NoiTra ? data.NoiTra : '',
                                noCont: data.NoCont ? data.NoCont : '',
                                noSeal: data.NoSeal ? data.NoSeal : '',
                                licensePlates: data.LicensePlates ? data.LicensePlates : '',
                                nameDriver: data.NameDriver ? data.NameDriver : '',
                                phoneNumberDriver: data.PhoneNumberDriver ? data.PhoneNumberDriver : '',
                                noteNLH: data.NoteNLH ? data.NoteNLH : '',
                                diaDiemTra: data.DiaDiemTra ? data.DiaDiemTra : '',
                                nguoiTraHang: data.NguoiTraHang ? data.NguoiTraHang : '',
                                phoneNumberNTH: data.PhoneNumberNTH ? data.PhoneNumberNTH : '',
                                noteNTH: data.NoteNTH ? data.NoteNTH : '',
                                noteOrder: data.NoteOrder ? data.NoteOrder : '',
                                status: data.Status ? data.Status : '',
                                created_Date: data.Created_Date ? data.Created_Date : null,
                                updated_Date: data.Updated_Date ? data.Updated_Date : null,
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
    // add_DonHang
    addDonHang: async(req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    const now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
                    const codeOrder = '';
                    await mLoaiHinhVanChuyen(db).findOne({
                        where: {
                            ID: body.idLoaiHinhVanChuyen ? body.idLoaiHinhVanChuyen : null,
                        }
                    }).then(loaiHinh => {
                        if (loaiHinh) codeOrder += loaiHinh.TenVietTat
                    })
                    codeOrder += moment().format('YYYY-MM-DD');
                    mDonHang(db).create({
                        IDLoaiHinhVanChuyen: body.idLoaiHinhVanChuyen ? body.idLoaiHinhVanChuyen : null,
                        IDKhachHang: body.idKhachHang ? body.idKhachHang : null,
                        IDNhaXe: body.idNhaXe ? body.idNhaXe : null,
                        IDNVCSKH: body.idNVCSKH ? body.idNVCSKH : null,
                        IDNVKH: body.idNVKH ? body.idNVKH : null,
                        CodeOrder: codeOrder,
                        NoVo: body.noVo ? body.noVo : null,
                        IDLoaiVo: body.idLoaiVo ? body.idLoaiVo : null,
                        TrongLuong: body.trongLuong ? body.trongLuong : '',
                        IDHangTau: body.idHangTau ? body.idHangTau : null,
                        NgayDong: body.ngayDong ? body.ngayDong : '',
                        GioDong: body.gioDong ? body.gioDong : '',
                        NoiDong: body.noiDong ? body.noiDong : '',
                        NgayTra: body.ngayTra ? body.ngayTra : '',
                        GioTra: body.gioTra ? body.gioTra : '',
                        NoiTra: body.noiTra ? body.noiTra : '',
                        NoCont: body.noCont ? body.noCont : '',
                        NoSeal: body.noSeal ? body.noSeal : '',
                        LicensePlates: body.licensePlates ? body.licensePlates : '',
                        NameDriver: body.nameDriver ? body.nameDriver : '',
                        PhoneNumberDriver: body.phoneNumberDriver ? body.phoneNumberDriver : '',
                        NoteNLH: body.noteNLH ? body.noteNLH : '',
                        DiaDiemTra: body.diaDiemTra ? body.diaDiemTra : '',
                        NguoiTraHang: body.nguoiTraHang ? body.nguoiTraHang : '',
                        PhoneNumberNTH: body.phoneNumberNTH ? body.phoneNumberNTH : '',
                        NoteNTH: body.noteNTH ? body.noteNTH : '',
                        NoteOrder: body.noteOrder ? body.noteOrder : '',
                        Status: body.status ? body.status : '',
                        Created_Date: now,
                        Updated_Date: null,
                    }).then(data => {
                        var result = {
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
    // update_DonHang
    updateDonHang: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    const now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
                    if (body.idLoaiHinhVanChuyen || body.idLoaiHinhVanChuyen === '') {
                        if (body.idLoaiHinhVanChuyen === '')
                            update.push({ key: 'IDLoaiHinhVanChuyen', value: null });
                        else
                            update.push({ key: 'IDLoaiHinhVanChuyen', value: body.idLoaiHinhVanChuyen });
                    }
                    if (body.idKhachHang || body.idKhachHang === '') {
                        if (body.idKhachHang === '')
                            update.push({ key: 'IDKhachHang', value: null });
                        else
                            update.push({ key: 'IDKhachHang', value: body.idKhachHang });
                    }
                    if (body.idNhaXe || body.idNhaXe === '') {
                        if (body.idNhaXe === '')
                            update.push({ key: 'IDNhaXe', value: null });
                        else
                            update.push({ key: 'IDNhaXe', value: body.idNhaXe });
                    }
                    if (body.idNVCSKH || body.idNVCSKH === '') {
                        if (body.idNVCSKH === '')
                            update.push({ key: 'IDNVCSKH', value: null });
                        else
                            update.push({ key: 'IDNVCSKH', value: body.idNVCSKH });
                    }
                    if (body.idNVKH || body.idNVKH === '') {
                        if (body.idNVKH === '')
                            update.push({ key: 'IDNVKH', value: null });
                        else
                            update.push({ key: 'IDNVKH', value: body.idNVKH });
                    }
                    if (body.codeOrder || body.codeOrder === '')
                        update.push({ key: 'CodeOrder', value: body.codeOrder });
                    if (body.noVo || body.noVo === '') {
                        if (body.noVo === '')
                            update.push({ key: 'NoVo', value: null });
                        else
                            update.push({ key: 'NoVo', value: body.noVo });
                    }
                    if (body.idLoaiVo || body.idLoaiVo === '') {
                        if (body.idLoaiVo === '')
                            update.push({ key: 'IDLoaiVo', value: null });
                        else
                            update.push({ key: 'IDLoaiVo', value: body.idLoaiVo });
                    }
                    if (body.trongLuong || body.trongLuong === '')
                        update.push({ key: 'TrongLuong', value: body.trongLuong });
                    if (body.idHangTau || body.idHangTau === '') {
                        if (body.idHangTau === '')
                            update.push({ key: 'IDHangTau', value: null });
                        else
                            update.push({ key: 'IDHangTau', value: body.idHangTau });
                    }
                    if (body.ngayDong || body.ngayDong === '')
                        update.push({ key: 'NgayDong', value: body.ngayDong });
                    if (body.gioDong || body.gioDong === '')
                        update.push({ key: 'GioDong', value: body.gioDong });
                    if (body.noiTra || body.noiTra === '')
                        update.push({ key: 'NoiTra', value: body.noiTra });
                    if (body.ngayTra || body.ngayTra === '')
                        update.push({ key: 'NgayTra', value: body.ngayTra });
                    if (body.gioTra || body.gioTra === '')
                        update.push({ key: 'GioTra', value: body.gioTra });
                    if (body.noiTra || body.noiTra === '')
                        update.push({ key: 'NoiTra', value: body.noiTra });
                    if (body.noCont || body.noCont === '')
                        update.push({ key: 'NoCont', value: body.noCont });
                    if (body.noSeal || body.noSeal === '')
                        update.push({ key: 'NoSeal', value: body.noSeal });
                    if (body.licensePlates || body.licensePlates === '')
                        update.push({ key: 'LicensePlates', value: body.licensePlates });
                    if (body.nameDriver || body.nameDriver === '')
                        update.push({ key: 'NameDriver', value: body.nameDriver });
                    if (body.phoneNumberDriver || body.phoneNumberDriver === '')
                        update.push({ key: 'PhoneNumberDriver', value: body.phoneNumberDriver });
                    if (body.noteNLH || body.noteNLH === '')
                        update.push({ key: 'NoteNLH', value: body.noteNLH });
                    if (body.diaDiemTra || body.diaDiemTra === '')
                        update.push({ key: 'DiaDiemTra', value: body.diaDiemTra });
                    if (body.nguoiTraHang || body.nguoiTraHang === '')
                        update.push({ key: 'NguoiTraHang', value: body.nguoiTraHang });
                    if (body.phoneNumberNTH || body.phoneNumberNTH === '')
                        update.push({ key: 'PhoneNumberNTH', value: body.phoneNumberNTH });
                    if (body.noteNTH || body.noteNTH === '')
                        update.push({ key: 'NoteNTH', value: body.noteNTH });
                    if (body.noteOrder || body.noteOrder === '')
                        update.push({ key: 'NoteOrder', value: body.noteOrder });
                    if (body.status || body.status === '')
                        update.push({ key: 'Status', value: body.status });

                    update.push({ key: 'Updated_Date', value: now });

                    database.updateTable(update, mDonHang(db), body.id).then(response => {
                        if (response == 1) {
                            res.json(Result.ACTION_SUCCESS);
                        } else {
                            res.json(Result.SYS_ERROR_RESULT);
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
    // delete_DonHang
    deleteDonHang: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = JSON.parse(body.listID);
                    await deleteRelationshipDonHang(db, listID);
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
    // get_list_DonHang
    getListDonHang: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var whereOjb = [];
                    let stt = 1;
                    let donHang = mDonHang(db);
                    donHang.belongsTo(mLoaiHinhVanChuyen(db), { foreignKey: 'IDLoaiHinhVanChuyen', sourceKey: 'IDLoaiHinhVanChuyen', as: 'loaiHinhVanChuyen' })
                    donHang.belongsTo(mtblKhachHang(db), { foreignKey: 'IDKhachHang', sourceKey: 'IDKhachHang', as: 'khachHang' })
                    donHang.belongsTo(mtblKhachHang(db), { foreignKey: 'IDNhaXe', sourceKey: 'IDNhaXe', as: 'nhaXe' })
                    donHang.belongsTo(mNhanVien(db), { foreignKey: 'IDNVCSKH', sourceKey: 'IDNVCSKH', as: 'nvcskh' })
                    donHang.belongsTo(mNhanVien(db), { foreignKey: 'IDNVKH', sourceKey: 'IDNVKH', as: 'nvkh' })
                    donHang.belongsTo(mLoaiVo(db), { foreignKey: 'IDLoaiVo', sourceKey: 'IDLoaiVo', as: 'loaiVo' })
                    donHang.belongsTo(mHangTau(db), { foreignKey: 'IDHangTau', sourceKey: 'IDHangTau', as: 'hangTau' })
                    donHang.findAll({
                        include: [{
                                model: mLoaiHinhVanChuyen(db),
                                required: false,
                                as: 'loaiHinhVanChuyen'
                            },
                            {
                                model: mtblKhachHang(db),
                                required: false,
                                as: 'khachHang'
                            },
                            {
                                model: mtblKhachHang(db),
                                required: false,
                                as: 'nhaXe'
                            },
                            {
                                model: mNhanVien(db),
                                required: false,
                                as: 'nvcskh'
                            },
                            {
                                model: mNhanVien(db),
                                required: false,
                                as: 'nvkh'
                            },
                            {
                                model: mLoaiVo(db),
                                required: false,
                                as: 'loaiVo'
                            },
                            {
                                model: mHangTau(db),
                                required: false,
                                as: 'hangTau'
                            },
                        ],
                    }).then(arrayDonHang => {
                        if (arrayDonHang.length > 0) {
                            for (const data of arrayDonHang) {
                                stt += 1;
                                var obj = {
                                    stt: stt,
                                    id: data.ID,
                                    idLoaiHinhVanChuyen: data.IDLoaiHinhVanChuyen ? data.IDLoaiHinhVanChuyen : null,
                                    objLoaiHinhVanChuyen: data.IDLoaiHinhVanChuyen ? data.loaiHinhVanChuyen : null,
                                    idKhachHang: data.IDKhachHang ? data.IDKhachHang : null,
                                    objKhachHang: data.IDKhachHang ? data.khachHang : null,
                                    idNhaXe: data.IDNhaXe ? data.IDNhaXe : null,
                                    objNhaXe: data.IDNhaXe ? data.nhaXe : null,
                                    idNVCSKH: data.IDNVCSKH ? data.IDNVCSKH : null,
                                    objNVCSKH: data.IDNVCSKH ? data.nvcskh : null,
                                    idNVKH: data.IDNVKH ? data.IDNVKH : null,
                                    objNVKH: data.IDNVKH ? data.nvkh : null,
                                    codeOrder: data.CodeOrder ? data.CodeOrder : '',
                                    noVo: data.NoVo ? data.NoVo : null,
                                    idLoaiVo: data.IDLoaiVo ? data.IDLoaiVo : null,
                                    objLoaiVo: data.IDLoaiVo ? data.loaiVo : null,
                                    trongLuong: data.TrongLuong ? data.TrongLuong : '',
                                    idHangTau: data.IDHangTau ? data.IDHangTau : '',
                                    objHangTau: data.IDHangTau ? data.hangTau : '',
                                    ngayDong: data.NgayDong ? data.NgayDong : '',
                                    gioDong: data.GioDong ? data.GioDong : '',
                                    noiDong: data.NoiDong ? data.NoiDong : '',
                                    ngayTra: data.NgayTra ? data.NgayTra : '',
                                    gioTra: data.GioTra ? data.GioTra : '',
                                    noiTra: data.NoiTra ? data.NoiTra : '',
                                    noCont: data.NoCont ? data.NoCont : '',
                                    noSeal: data.NoSeal ? data.NoSeal : '',
                                    licensePlates: data.LicensePlates ? data.LicensePlates : '',
                                    nameDriver: data.NameDriver ? data.NameDriver : '',
                                    phoneNumberDriver: data.PhoneNumberDriver ? data.PhoneNumberDriver : '',
                                    noteNLH: data.NoteNLH ? data.NoteNLH : '',
                                    diaDiemTra: data.DiaDiemTra ? data.DiaDiemTra : '',
                                    nguoiTraHang: data.NguoiTraHang ? data.NguoiTraHang : '',
                                    phoneNumberNTH: data.PhoneNumberNTH ? data.PhoneNumberNTH : '',
                                    noteNTH: data.NoteNTH ? data.NoteNTH : '',
                                    noteOrder: data.NoteOrder ? data.NoteOrder : '',
                                    status: data.Status ? data.Status : '',
                                    created_Date: data.Created_Date ? data.Created_Date : null,
                                    updated_Date: data.Updated_Date ? data.Updated_Date : null,
                                }
                                var result = {
                                    obj: obj,
                                    status: Constant.STATUS.SUCCESS,
                                    message: Constant.MESSAGE.ACTION_SUCCESS,
                                }
                                res.json(result);
                            }
                        } else {
                            res.json(Result.NO_DATA_RESULT)

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
    // get_list_name_DonHang
    getListNameDonHang: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mDonHang(db).findAll().then(data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                id: Number(element.ID),
                                name: element.Name ? element.Name : '',
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