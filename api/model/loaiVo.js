const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('LoaiVo', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.STRING,
        Note: Sequelize.STRING,
        Deleted: Sequelize.BOOLEAN
    });

    return table;
}