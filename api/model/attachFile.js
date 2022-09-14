const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblAttachFile', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        IDDonHang: Sequelize.BIGINT,
        IDDMXeCongTy: Sequelize.BIGINT,
        Name: Sequelize.STRING,
        Link: Sequelize.STRING,
        Type: Sequelize.STRING,

    });

    return table;
}