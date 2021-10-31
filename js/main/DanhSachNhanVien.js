/**
 * Chứa danh sách nhiều nhân viên (nhiều đối tượng)
 * 
 * + mangNV
 * 
 * Phương thức: thêm, sửa, xóa...
 * + Thêm nhân viên => Thêm 1 phần tử mới vào mảng
 * + Cập nhật nv => thay đổi giá trị của phần tử trong mảng
 *
 * + Tìm kiếm nv => Tìm kiếm phần tử trong mảng
 */

// + Xóa nv => Xóa 1 phẩn từ ra khỏi mảng
/**
 * _ Dựa vào vị trí (index) trong mảng => dựa vào mã nhân viên để xác định vị trí nhân viên trong maảng
 * _ Tạo hàm tìm vị trí(index)
 * viTri = -1;
 * Nếu không tìm thấy vị tí nhân viên thì viTri = -1
 * Ngược lại tìm thấy nhân viên thì viTri > -1
 * 
 * _xoaNhanVien: Dựa vòa kết quả cuẩ hàm tìm vịt trí để xóa nhân viên ra khỏi mảng
 */

 function DanhSachNhanVien() {

    //Thuộc tính
     this.mangNV = [];

     //Phương thức
     this.themNV = function(nv) {
         this.mangNV.push(nv);
     }

     this.timViTri = function(ma) {
         var viTri = -1;
         this.mangNV.map(function(item, index) {
            if (item.maNV == ma) {
                //Tìm thấy nhân viên trong mảng
                viTri = index;
            }
         });
         return viTri;
     }
     this.xoaNV = function(ma) {
         var viTri = this.timViTri(ma);
         if (viTri != -1) {
             //Tìm thấy nhân viên
             this.mangNV.splice(viTri, 1);
         }
     }
     this.layChiTiet = function(ma) {
         var viTri = this.timViTri(ma);
         var nv = "";
         if (viTri != -1) {
            //Tìm thấy nhân viên
            nv = dsnv.mangNV[viTri];
        }
        return nv;
     }
     this.capNhatNV = function(nv) {
        var viTri = this.timViTri(nv.maNV);
        if (viTri != -1) {
            //Tìm thấy nhân viên
            dsnv.mangNV[viTri] = nv;
        }
     }
 }