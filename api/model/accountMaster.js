const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblAccountMaster', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        UserName: Sequelize.STRING,
        Password: Sequelize.STRING,

    });

    return table;
}