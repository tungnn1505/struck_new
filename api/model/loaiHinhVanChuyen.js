const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblLoaiHinhVanChuyen', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        TenVietTat: Sequelize.STRING,
        TenLoaiHinh: Sequelize.STRING,
    });

    return table;
}