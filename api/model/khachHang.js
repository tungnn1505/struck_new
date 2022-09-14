const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblKhachHang', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        MaKhachHang: Sequelize.STRING,
        TenKhachHang: Sequelize.STRING,
        TenVietTat: Sequelize.STRING,
        LoaiKhachHang: Sequelize.STRING,
        Address: Sequelize.STRING,
        PhoneNumber: Sequelize.STRING,
        Email: Sequelize.STRING,
        CMT: Sequelize.STRING,
        SoDuDauKy: Sequelize.FLOAT,
        IDPhuongPhapThanhToan: Sequelize.BIGINT,
        HanMuc: Sequelize.FLOAT,
        StartDatePay: Sequelize.FLOAT,
        EndDatePay: Sequelize.FLOAT,
        Deleted: Sequelize.BOOLEAN,
        CreateDate: Sequelize.NOW,
        UpdateDate: Sequelize.NOW,
    });

    return table;
}