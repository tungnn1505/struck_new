const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblCustomer', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.STRING,
        ShortName: Sequelize.STRING,
        Address: Sequelize.STRING,
        Email: Sequelize.STRING,
        Fax: Sequelize.STRING,
        Phone: Sequelize.STRING,
        ContactName: Sequelize.STRING,
        ContactPhone: Sequelize.STRING,

    });

    return table;
}