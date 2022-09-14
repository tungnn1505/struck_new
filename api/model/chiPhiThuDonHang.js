const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblChiPhiThuDonHang', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        IDDonHang: Sequelize.BIGINT,
        TenChiPhiThu: Sequelize.STRING,
        ChiPhiPhatSinhThu: Sequelize.FLOAT,
        ThongBaoNVTDKHSuaCP: Sequelize.BOOLEAN,

    });

    return table;
}