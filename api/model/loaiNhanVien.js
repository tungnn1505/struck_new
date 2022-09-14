const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblLoaiNhanVien', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        MaLoaiNhanVien: Sequelize.STRING,
        TenLoaiNhanVien: Sequelize.STRING,
        GhiChu: Sequelize.STRING,

    });

    return table;
}