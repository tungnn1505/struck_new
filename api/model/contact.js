const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblContact', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        IDKhachHang: Sequelize.BIGINT,
        IDNhaXe: Sequelize.BIGINT,
        HoTen: Sequelize.STRING,
        PhoneNumber: Sequelize.STRING,
        Email: Sequelize.STRING,
        Zalo: Sequelize.STRING,
        LoaiTinNhan: Sequelize.STRING,
        NguoiDaiDien: Sequelize.BOOLEAN,

    });

    return table;
}