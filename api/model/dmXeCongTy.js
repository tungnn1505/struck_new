const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblDMXeCongTy', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        BienSoXe: Sequelize.STRING,
        LoaiDauKeo: Sequelize.STRING,
        SoRoMooc: Sequelize.STRING,
        LoaiSoMi: Sequelize.STRING,
        GPS: Sequelize.STRING,
        TenLaiXe: Sequelize.STRING,
        SoDienThoai: Sequelize.STRING,
        SoCMT: Sequelize.STRING,
        SoBangLai: Sequelize.STRING,
        SoDangKiem: Sequelize.STRING,
        NgayHetHanDK: Sequelize.STRING,
        SoBHTNDS: Sequelize.STRING,
        NgayHetHanBHTNDS: Sequelize.STRING,
        DinhMuc: Sequelize.FLOAT,
        ThongSoKyThuat: Sequelize.STRING,

    });

    return table;
}