const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('CustomerDB', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        IDCustomer: Sequelize.BIGINT,
        UserName: Sequelize.STRING,
        Password: Sequelize.STRING,
        NameDB: Sequelize.STRING,
        Status: Sequelize.BOOLEAN,
        KeyLicense: Sequelize.STRING,
        KeyConnect: Sequelize.STRING,

    });

    return table;
}