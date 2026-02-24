# EduPass - Learn today. Pass tomorrow

Website học tập trực tuyến với kho đề thi và tài liệu phong phú.

## 📁 Cấu trúc thư mục

```
EduPass/
├── assets/
│   └── logo.png          ⭐ ĐẶT LOGO EDUPASS VÀO ĐÂY
├── index.html
├── dang-nhap.html
├── dang-ky.html
├── tai-lieu.html
├── luyen-thi.html
├── styles.css
├── script.js
└── README.md
```

## 🎨 Hướng dẫn cài đặt Logo

### ⚠️ QUAN TRỌNG: Đặt logo vào đúng vị trí

1. Lưu file logo EduPass (PNG nền trong suốt) vào thư mục `assets/`
2. Đổi tên file thành `logo.png`
3. Đường dẫn cuối cùng: `assets/logo.png`

### ✅ Logo đã được tích hợp vào:

#### 1. NAVBAR (Tất cả trang)
- Vị trí: Góc trái menu
- Kích thước: 45px chiều cao
- Hover: Scale 1.05 với transition 0.3s
- Click: Quay về trang chủ
- Mobile: Giảm xuống 35px

#### 2. TRANG ĐĂNG NHẬP / ĐĂNG KÝ
- Vị trí: Phía trên form, căn giữa
- Kích thước: 80px
- Có slogan: "Learn today. Pass tomorrow."
- Animation: Fade-in khi mở trang
- Mobile: Giảm xuống 70px, vẫn căn giữa

#### 3. FOOTER (Tất cả trang)
- Vị trí: Bên trái footer
- Kích thước: 35px
- Bên cạnh: Mô tả ngắn về EduPass
- Layout: Flexbox responsive
- Mobile: Logo nằm trên, text nằm dưới, căn giữa

## 🎯 Tính năng Logo

✅ Responsive trên mọi thiết bị
✅ Không bị méo hoặc vỡ
✅ Hiệu ứng hover mượt mà
✅ Tối ưu hiển thị mọi màn hình
✅ Favicon tự động từ logo
✅ Transition mượt 0.3s

## 🔧 Thông tin thanh toán cần cập nhật

Trong file `script.js`, cập nhật thông tin sau:

1. **Số Zalo**: Tìm `0987654321` và thay bằng số của bạn
2. **Link Zalo**: Tìm `https://zalo.me/0987654321` và thay bằng link của bạn
3. **Thông tin ngân hàng**:
   - Ngân hàng: MB Bank (hoặc ngân hàng của bạn)
   - Số tài khoản: 0123456789
   - Chủ tài khoản: NGUYEN VAN A

## 🚀 Chạy website

Mở file `index.html` trong trình duyệt để xem website.

## 📱 Responsive Design

- Desktop: Logo 45px (navbar), 80px (auth), 35px (footer)
- Mobile: Logo 35px (navbar), 70px (auth), 30px (footer)
- Tất cả logo đều responsive và không bị méo

## 🎨 Màu sắc chính

- Navbar: Nền trắng, chữ #2c3e50
- Primary: #3498db (xanh dương)
- Footer: Nền #2c3e50 (xám đậm)
- Hover: #3498db (xanh dương)

## 📄 Các trang

1. **Trang chủ** (index.html) - Giới thiệu và điều hướng
2. **Kho tài liệu** (tai-lieu.html) - Tìm kiếm và mua tài liệu
3. **Luyện thi** (luyen-thi.html) - Làm bài thi trực tuyến
4. **Đăng ký** (dang-ky.html) - Tạo tài khoản mới
5. **Đăng nhập** (dang-nhap.html) - Đăng nhập hệ thống

