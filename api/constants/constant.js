module.exports = {
    MESSAGE: {
        SYS_ERROR: "Lỗi xử lý hệ thống!",
        ACTION_FAIL: "Thao tác thất bại!",
        ACTION_SUCCESS: "Thao tác thành công!",
        LOGIN_SUCCESS: "Đăng nhập thành công!",
        DATA_NOT_FOUND: "Không tìm thấy dữ liệu!",
        LOGIN_FAIL: "Đăng nhập thất bại!",
        INVALID_COMPANY: "Công ty đã tồn tại!",
        NO_PERMISSION: "Bạn không có quyền thực hiện thao tác này!",
        INVALID_USER: "Tên đăng nhập đã tồn tại!",
        BINDING_ERROR: "Lỗi ràng buộc",
        DATA_FAIL: "Lỗi dữ liệu",
        USERNAME_PASS_INCORRECT: "Tài khoản hoặc mật khẩu không chính xác",
        USER_FAIL: "ID User không chính xác. Vui lòng kiểm tra lại hoặc liên hệ với admin.",
        CREATE_DB_FAIL: "Tạo cơ cở dữ liệu không thành công. Vui lòng thử lại sau!",
        ALERADY_EXIST_DATA: "Dữ liệu đã tồn tại. Vui lòng kiểm tra lại!",
    },

    USER_ROLE: {
        STAFF: 'Nhân Viên',
        MANAGER: 'Quản Lý'
    },

    STATUS: {
        SUCCESS: 1,
        FAIL: 0
    },

    ACTIVITY_TYPE: {
        ALL: 0,
        CALL: 1,
        EMAIL: 2,
        MEET: 3,
        NOTE: 4,
        TASK: 5
    },

    COMPANY_ROLE: {
        PARENT: 1,
        CHILD: 2
    },

    MAIL_RESPONSE_TYPE: {
        SEND: 1,
        OPEN: 2,
        CLICK_LINK: 3,
        INVALID: 4,
        UNSUBSCRIBE: 5
    },

    TIME_SELECT: {
        TODAY: 1,
        YESTERDAY: 2,
        LAST_24H: 3,
        LAST_7DAY: 4,
        LAST_30DAY: 5,
        THIS_MONTH: 6,
        LAST_MONTH: 7,
        ALL_TIME: 8,
        SELECT: 9,
    },

    TIME_TYPE: {
        HOUR: 1, //Giờ
        DAY: 2, //Thứ trong tuần
        DATE: 3, //Ngày trong tháng
        MONTH: 4 //Tháng trong năm
    },

    STATUS_APPROVAL: {
        WAITING: 1,
        APPROVALING: 2,
        DECLINED: 3,
        APPROVALED: 4,
        CANCEL_PURCHASE: 5,
        PURCHASED: 6,
    }
}