const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblChiPhiKhacChoXeCT', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        IDDonHang: Sequelize.BIGINT,
        TenChiPhikhac: Sequelize.STRING,
        ChiPhi: Sequelize.FLOAT,
        ThongBaoNVTDKHSuaCP: Sequelize.BOOLEAN,

    });

    return table;
}