const Sequelize = require('sequelize');

module.exports = function (db) {
    var table = db.define('tblTienTe', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        TenVietTat: Sequelize.STRING,
        TenDayDu: Sequelize.STRING

    });

    return table;
}