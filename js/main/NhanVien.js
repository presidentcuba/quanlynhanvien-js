/**
 * Author: tinhdev
 * Mục Đích:
 * Chứa thông tin
 * + maNV, tenNV, email, matKhau, ngayLam, chucVu
 * 
 * Release Date: 3/3/2021
 */
function NhanVien(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu){
    //Thuộc tính
    // Key => Value

    this.maNV = _maNV;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.chucVu = _chucVu;
}