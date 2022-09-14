const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblPhuongPhapThanhToan', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        TenThanhToan: Sequelize.STRING,
        GhiChu: Sequelize.STRING

    });
    return table;
}