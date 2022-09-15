const { STRING } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblDonHang', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        IDLoaiHinhVanChuyen: Sequelize.BIGINT,
        IDKhachHang: Sequelize.BIGINT,
        IDNhaXe: Sequelize.BIGINT,
        IDNVCSKH: Sequelize.BIGINT,
        IDNVKH: Sequelize.BIGINT,
        CodeOrder: Sequelize.STRING,
        NoVo: Sequelize.INTEGER,
        IDLoaiVo: Sequelize.BIGINT,
        TrongLuong: Sequelize.STRING,
        IDHangTau: Sequelize.BIGINT,
        NgayDong: Sequelize.STRING,
        GioDong: Sequelize.STRING,
        NoiDong: Sequelize.STRING,
        NgayTra: Sequelize.STRING,
        GioTra: Sequelize.STRING,
        NoiTra: Sequelize.STRING,
        NoCont: Sequelize.STRING,
        NoSeal: Sequelize.STRING,
        LicensePlates: Sequelize.STRING,
        NameDriver: Sequelize.STRING,
        PhoneNumberDriver: Sequelize.STRING,
        NoteNLH: Sequelize.STRING,
        DiaDiemTra: Sequelize.STRING,
        NguoiTraHang: Sequelize.STRING,
        PhoneNumberNTH: Sequelize.STRING,
        NoteNTH: Sequelize.STRING,
        NoteOrder: Sequelize.STRING,
        Status: Sequelize.STRING,
        Created_Date: Sequelize.NOW,
        Updated_Date: Sequelize.NOW,
        STT: Sequelize.INTEGER,
        STTDN: Sequelize.INTEGER,

    });

    return table;
}