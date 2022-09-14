const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblAccountBanking', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        IDKhachHang: Sequelize.BIGINT,
        IDNhaXe: Sequelize.BIGINT,
        ChiNhanh: Sequelize.STRING,
        SoTaiKhoan: Sequelize.STRING,
        TenNganHang: Sequelize.STRING,
        IDTienTe: Sequelize.BIGINT,

    });

    return table;
}