const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblChiPhiChiDonHang', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        IDDonHang: Sequelize.BIGINT,
        TenChiPhiChi: Sequelize.BIGINT,
        ChiPhiPhatSinhChi: Sequelize.FLOAT,
        ISCOM: Sequelize.BOOLEAN,
        ThongBaoNVTDKHSuaCP: Sequelize.BOOLEAN,

    });

    return table;
}