const Constant = require('../constants/constant');
const Result = require('../constants/result');
const mtblCustomerDB = require('../model/customerDB');
const mtblNhanVien = require('../model/nhanVien');
const database = require('../database');
const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        let body = req.body;
        database.connectDBCustomer().then(async custommerDB => {
            if (custommerDB) {
                try {
                    let check = await mtblCustomerDB(custommerDB).findOne({
                        where: {
                            KeyLicense: body.key ? body.key : null,
                            Status: 1
                        }
                    })
                    let dbName = '';
                    if (check) {
                        dbName = check.NameDB
                        let db = await database.connectDatabaseWithNameDB(dbName)
                        if (db) {
                            let staff = await mtblNhanVien(db).findOne({
                                where: {
                                    Username: body.userName,
                                    Password: body.password,
                                }
                            })
                            if (staff) {
                                var payload = {
                                        "userID": staff.ID,
                                        "username": staff.Username,
                                        "password": staff.Password,
                                        "user": staff,
                                        // standard fields
                                        // - Xác thực người tạo
                                        "iss": "Tungnn",
                                    }
                                    // payload = { username: 'haidn', password: '123456a$' }
                                let token = jwt.sign(payload,
                                    'struck2022*#', { expiresIn: '30d' }
                                );
                                var result = {
                                    status: Constant.STATUS.SUCCESS,
                                    message: Constant.MESSAGE.LOGIN_SUCCESS,
                                    token: token,
                                }
                                res.json(result);
                            } else {
                                var result = {
                                    status: Constant.STATUS.FAIL,
                                    message: 'Tên đăng nhập hoặc tài khoản không chính xác. Vui lòng đăng nhập lại!',
                                }
                                res.json(result);
                            }
                        } else {
                            var result = {
                                status: Constant.STATUS.FAIL,
                                message: "Tên cơ sở dữ liệu chưa đúng",
                            }
                            res.json(result);
                        }
                    } else {
                        var result = {
                            status: Constant.STATUS.FAIL,
                            message: 'Khoá đăng nhập không chính xác. Vui lòng kiểm tra lại',
                        }
                        res.json(result);

                    }
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    loginDB: (req, res) => {
        let body = req.body;
        database.connectDBCustomer().then(async custommerDB => {
            if (custommerDB) {
                try {
                    let dbCus = await mtblCustomerDB(custommerDB).findOne({
                        where: {
                            UserName: body.userName ? body.userName : '',
                            Password: body.password ? body.password : ''
                        }
                    })
                    var payload = {
                            "customeID": dbCus.ID,
                            // standard fields
                            // - Xác thực người tạo
                            "iss": "Tungnn",
                        }
                        // payload = { username: 'haidn', password: '123456a$' }
                    let token = jwt.sign(payload,
                        'struck2022*#', { expiresIn: '30d' }
                    );
                    if (dbCus) {
                        var result = {
                            status: Constant.STATUS.SUCCESS,
                            message: Constant.MESSAGE.LOGIN_SUCCESS,
                            token: token,
                        }
                        res.json(result);
                    } else {
                        var result = {
                            status: Constant.STATUS.FAIL,
                            message: Constant.MESSAGE.USERNAME_PASS_INCORRECT,
                        }
                        res.json(result);
                    }

                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    changePassword: (req, res) => {
        let body = req.body;
        if (body.newPassword != body.rePassword) {
            var result = {
                status: Constant.STATUS.FAIL,
                message: 'Mật khẩu nhắc lại không khớp. Vui lòng kiểm tra lại!',
            }
            res.json(result);
        } else {
            database.connectDBCustomer().then(async custommerDB => {
                if (custommerDB) {
                    try {
                        if (body.dbName) {
                            console.log(body);
                            database.connectDatabaseWithNameDB(body.dbName).then(async db => {
                                try {
                                    if (db) {
                                        await database.updateTable([{
                                            key: 'Password',
                                            value: body.newPassword
                                        }], mtblNhanVien(db), body.staffID)
                                        await mtblCustomerDB(custommerDB).update({
                                            Password: body.newPassword,
                                        }, {
                                            where: {
                                                UserName: body.userName,
                                                NameDB: body.dbName,
                                            }
                                        })
                                        var result = {
                                            status: Constant.STATUS.SUCCESS,
                                            message: Constant.MESSAGE.ACTION_SUCCESS,
                                        }
                                        res.json(result);
                                    } else {
                                        var result = {
                                            status: Constant.STATUS.FAIL,
                                            message: 'Đổi mật khẩu không thành công! (không tìm thấy dbName trong DB)',
                                        }
                                        res.json(result);
                                    }
                                } catch (error) {
                                    var result = {
                                        status: Constant.STATUS.FAIL,
                                        message: Constant.MESSAGE.LOGIN_FAIL,
                                    }
                                    res.json(result);
                                }

                            })
                        } else {
                            var result = {
                                status: Constant.STATUS.FAIL,
                                message: 'Đổi mật khẩu không thành công! (Chưa có dbName)',
                            }
                            res.json(result);
                        }
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
}