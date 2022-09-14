const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblDauGia', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        IDYeuCau: Sequelize.BIGINT,
        IDCustomer: Sequelize.BIGINT,
        ChiPhi: Sequelize.FLOAT,

    });

    return table;
}