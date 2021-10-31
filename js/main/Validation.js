function Validation()
{
    //Phương thức
    this.kiemTraRong = function(value, spanID, message) {
        if (value != '') {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            //Không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }
    this.kiemTraMaTrung =  function(mangNV, value, spanID, message) {
        /**
         * 1. Duyệt mảng nhân viên
         * 2. Kiểm tra nhan viên có bị trùng với value trong mảng hay k
         * Bị trùng => return false
         * Không bị trùng => return true
         */

         //some: duyệt mảng: trả về true khi có phần tử đầu tiên bị trùng

         var isExist = false;
         isExist = mangNV.some(function(item) {
             //Tìm kiếm giá trị người dùng nhập có tồn tại trong mảng
            return value === item.maNV;
         });

         if (isExist) {
             //Mã bị trùng => không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
             return false;
         } else {
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = "none";
            return true;
             //Mã ko trùng =? Hợp lệ
         }
    }
    this.kiemTraTen = function(value, spanID, message) {
        // Cách 1: Sử dụng đối tượng RegExp

        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựýỳỵỷỹ\\s]+$");

        if (pattern.test(value)) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }

    }
    this.kiemTraEmail = function(value, spanID, message) {

        //Cách 2: Sử dụng chuỗi của RegExp
        var formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (value.match(formatEmail)) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            //Không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }
    this.kiemTraDoDai = function(value, spanID, message, min, max) {
        if (value.length > min && value.length <= max) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        else {
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }
    this.kiemTraChucVu = function(selectID, spanID, message) {
        var index = document.getElementById(selectID).selectedIndex;

        if (index != 0) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            //Không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }
}
//Prototype => Thêm tính năng, chức năng mới từ bên ngoài function

DanhSachNhanVien.prototype.timKiemNhanVien = function(chuoiTK) {
    var mangTimKiem = [];

    this.mangNV.map(function(item) {
        var tenThuong = item.tenNV.toLowerCase();
        var chuoiTkThuong = chuoiTK.trim().toLowerCase();

        //Indexof => Nếu tìm thấy kỹ tự chữ trùng với tên nhân viên thì trả về vị trí chữ tìm thấ
        if (tenThuong.indexOf(chuoiTkThuong) > -1) {
            //Tìm thấy
            mangTimKiem.push(item);
        }
    });
    return mangTimKiem;
}