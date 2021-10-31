// Khai báo biến toàn cục

var dsnv = new DanhSachNhanVien();
var validation = new Validation();

//Lấy dũ liệu từ storage => chạy khi trang vừa load
getLocalStorage();

//Hàm rút gọn cú pháp document.getelementById
function getELE(id) {
    return document.getElementById(id);
}

//Xử lý khi thêm nv mới
getELE("btnThem").addEventListener("click", function() {
    getELE("btnThemNV").style.display = "block";
    getELE("btnCapNhat").style.display = "none";
    getELE("msnv").removeAttribute("disabled");
});

//Găn sự kiện click cho button thêm người dùng
//btn.onclick = function() {}
//Khai gán hàm onclick không để dấu tròn (), để tránh hàm chạy khi trang vừa load

getELE("btnThemNV").onclick = themNhanVien;

//Hàm lấy thông tin nhân viên, thêm nhân viên
function themNhanVien() {
    //Lấy thông tin nhân viên

    var _maNV = getELE("msnv").value;
    var _tenNV = getELE("name").value;
    var _email = getELE("email").value;
    var _matKhau = getELE("password").value;
    var _ngayLam = getELE("datepicker").value;
    var _chucVu = getELE("chucvu").value;

    console.log(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu);

    //Kiểm tra rỗng
    var isValid = true;

    //Kiểm tra mã nhân viên => Mã nhân viên k được để trống và trùng
    isValid &= validation.kiemTraRong(_maNV,"tbMaNV", "Mã nhân viên không được để trống") && validation.kiemTraMaTrung(dsnv.mangNV, _maNV, "tbMaNV", "Mã nhân viên bị trùng");

    //Kiểm tra tên nhân viên
    isValid &= validation.kiemTraRong(_tenNV,"tbTen","Tên nhân viên không được để trống") && validation.kiemTraTen(_tenNV,"tbTen", "Tên nhân viên phải là ký tự chữ");

    //Kiểm tra password
    isValid &= validation.kiemTraRong(_matKhau,"tbMatKhau", "Mật khẩu không được để trống") && validation.kiemTraDoDai(_matKhau,"tbMatKhau", "Mật khẩu có độ dài từ 6 - 8 ký tự", 6, 8);
    
    //Kiểm tra email
    isValid &= validation.kiemTraRong(_email, "tbEmail", "Email không được được để trống") && validation.kiemTraEmail(_email, "tbEmail", "Email không đúng định dạng");

    //Kiểm tra ngày làm
    isValid &= validation.kiemTraRong(_email, "tbNgay", "Ngày làm không được để trống");

    //Kiểm tra chức vụ
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "Chức vụ phải được chọn");


    if (isValid) { 
        // Tạo instance (Thể hiện)

        var nv = new NhanVien(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu);

        console.log(nv);

        dsnv.themNV(nv);
        console.log(dsnv.mangNV);
        //Gọi hàm tạo bảng
        taoBang(dsnv.mangNV);
        setLocalStorage();
    }

    
}

//Khai báo hàm
function taoBang(mang) {
    var tbody = getELE("tableDanhSach");

    // content chưa thẻ tr (mỗi tr chứa thông tin 1 nhân viên)
    var content = "";
    // map: Giúp duyệt mảng =>
    // for: cú pháp dài, tốc độ duyệt mảng nhanh
    mang.map(function(item,  index) {
        //item => đại diện cho 1 nhân viên
        //index => vị trí của phần tử trong mảng
        content += `
             <tr>
                <td>${item.maNV}</td>
                <td>${item.tenNV}</td>
                <td>${item.email}</td>
                <td>${item.ngayLam}</td>
                <td>${item.chucVu}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${item.maNV}')">Xóa</button>
                    <button data-toggle="modal"
                    data-target="#myModal" class="btn btn-info"
                    onclick="hienThiChiTiet('${item.maNV}')">Sửa</button>
                </td>
             </tr>
        `;
    });

    tbody.innerHTML = content;
}

//Hàm xóa nhân viên

function xoaNhanVien(ma) {
    dsnv.xoaNV(ma);
    taoBang(dsnv.mangNV);
    setLocalStorage();
}

function hienThiChiTiet(ma) {
    var nv = dsnv.layChiTiet(ma);

    //Xử lý botton
    getELE("btnThemNV").style.display = "none";
    getELE("btnCapNhat").style.display = "block";
    //Điền thông tin nhân viên lên forrm

    getELE("msnv").value = nv.maNV;
    getELE("msnv").disabled = "true";
    getELE("name").value = nv.tenNV;
    getELE("email").value = nv.email;
    getELE("password").value = nv.matKhau;
    getELE("datepicker").value = nv.ngayLam;
    getELE("chucvu").value = nv.chucVu;
}


getELE("btnCapNhat").onclick = capNhatNhanVien;
function capNhatNhanVien() {
    var _maNV = getELE("msnv").value;
    var _tenNV = getELE("name").value;
    var _email = getELE("email").value;
    var _matKhau = getELE("password").value;
    var _ngayLam = getELE("datepicker").value;
    var _chucVu = getELE("chucvu").value;

     // Tạo instance (Thể hiện)

     var nv = new NhanVien(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu);

     console.log(nv);

     dsnv.capNhatNV(nv);
     taoBang(dsnv.mangNV);
     setLocalStorage();
}
//Hàm lưu data xuống local storage => Chỗ lưu trữ offline trong trình duyệt của người dùng
//Khai báo hàm
function setLocalStorage() {
    //Lưu dữ liệu xuống local storage
    //Chỉ cho phép lưu trữ dữ liệu kiểu json
    //Chuyển kiểu mảng sang kiểu jon => dùng stringify của đối tượng json

    localStorage.setItem(
        "DSNV",
        JSON.stringify(dsnv.mangNV)
    );
}

//Khai báo hàm
//Hàm lấy dữ liệu từ local storage
function getLocalStorage() {

    //parse => chuyển json sang kiểu mảng
    //Kiểm tra local storage
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(
            localStorage.getItem("DSNV")
        );
        taoBang(dsnv.mangNV);
    }
}


//Cách 1 => Click vào button search => mới tìm kiếm
getELE("btnTimNV").addEventListener("click", function() {
    var chuoiTK = getELE("searchName").value;
    var mangTK = [];
    // Truyền value nhập vào func
    mangTK = dsnv.timKiemNhanVien(chuoiTK);

    taoBang(mangTK);
});
//Gỗ từ khóa vào sẽ search ngay lập tức

getELE("searchName").addEventListener("keypress", function() {
    var chuoiTK = getELE("searchName").value;
    var mangTK = [];
    // Truyền value nhập vào func
    mangTK = dsnv.timKiemNhanVien(chuoiTK);

    taoBang(mangTK);
})