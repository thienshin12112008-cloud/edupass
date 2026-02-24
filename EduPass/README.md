# EduPass - Nền tảng học tập trực tuyến

**Learn today. Pass tomorrow.**

## 📚 Giới thiệu

EduPass là nền tảng học tập trực tuyến dành cho học sinh THPT, cung cấp kho tài liệu phong phú và hệ thống luyện thi hiệu quả.

## ✨ Tính năng chính

### 🏠 Trang chủ
- Hero section với mascot cá heo EduPass
- Giới thiệu về EduPass
- Môn học nổi bật (12 môn)
- Đánh giá từ học viên
- Thông tin đội ngũ sáng lập
- Form liên hệ

### 📖 Kho tài liệu
- Tìm kiếm và lọc tài liệu theo môn, lớp, giá
- Xem trước và tải tài liệu
- Thanh toán qua QR code

### 📝 Luyện thi
- Chọn môn học và làm đề thi
- Hệ thống đếm giờ
- Chấm điểm tự động
- Xem đáp án chi tiết

### ✨ Tạo đề thi tự luyện (MỚI!)
- **Nhập thông tin đề thi**: Tên đề, lớp, môn học, chủ đề
- **2 cách tạo đề**:
  - Upload file (hỗ trợ nhiều định dạng):
    - 📄 PDF (.pdf)
    - 📝 Word (.doc, .docx)
    - 🖼️ Ảnh (.jpg, .jpeg, .png, .gif, .bmp, .webp, .svg)
    - 📃 Text (.txt, .rtf)
    - Kích thước tối đa: 20MB
    - Drag & drop hoặc click để chọn
  - Tạo câu hỏi trắc nghiệm trực tiếp
- **Cài đặt đề thi**:
  - Số câu hỏi (5-100)
  - Thời gian làm bài
  - Mức độ: Cơ bản/Trung bình/Nâng cao/Tổng hợp
  - Toggle xáo trộn câu hỏi
  - Toggle xem đáp án sau khi nộp
- **Hành động**:
  - Xem trước đề
  - Lưu đề vào tài khoản
  - Bắt đầu làm bài ngay
- **UI/UX**: Card layout hiện đại giống Azota, responsive mobile
- **Hướng dẫn**: Có phần hướng dẫn chi tiết 5 bước và mẹo nhỏ

### 👤 Tài khoản
- Thông tin cá nhân (tên, email, ngày tham gia)
- Thống kê học tập
- Lịch sử làm bài
- Tài liệu đã mua

### 🔐 Đăng nhập / Đăng ký
- Form đăng nhập với "Quên mật khẩu"
- Form đăng ký với validation
- Lưu phiên đăng nhập

### 📖 Câu chuyện EduPass
- Giới thiệu về sứ mệnh
- Thông tin đội ngũ sáng lập
- Tầm nhìn và giá trị cốt lõi

## 🛠️ Công nghệ

- HTML5
- CSS3 (Gradient, Animation, Flexbox, Grid)
- JavaScript (ES6+)
- LocalStorage API
- Responsive Design

## 📁 Cấu trúc file

```
EduPass/
├── assets/
│   ├── logo.png           # Logo EduPass
│   └── logo2.png          # Mascot cá heo
├── index.html             # Trang chủ
├── tai-lieu.html          # Kho tài liệu
├── luyen-thi.html         # Luyện thi
├── tao-de-thi.html        # Tạo đề thi tự luyện ⭐ MỚI
├── tai-khoan.html         # Tài khoản
├── dang-nhap.html         # Đăng nhập
├── dang-ky.html           # Đăng ký
├── cau-chuyen.html        # Câu chuyện EduPass
├── styles.css             # CSS chung
├── tao-de-thi.css         # CSS trang tạo đề thi ⭐ MỚI
├── script.js              # JavaScript chung
├── tao-de-thi.js          # JavaScript trang tạo đề thi ⭐ MỚI
└── README.md
```

## 🎨 Thiết kế

- **Màu chủ đạo**: Gradient tím (#667eea → #764ba2)
- **Font**: Segoe UI
- **Bo góc**: 12px
- **Shadow**: Nhẹ nhàng, hiện đại
- **Animation**: Mượt mà, không quá phức tạp

## 📱 Responsive

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🚀 Hướng dẫn sử dụng

### Chạy website
Mở file `index.html` trong trình duyệt để xem website.

### Tạo đề thi tự luyện
1. Truy cập trang "Tạo đề thi" từ menu
2. Nhập thông tin đề thi
3. Chọn cách tạo đề (upload hoặc tạo câu hỏi)
4. Cài đặt đề thi
5. Xem trước và bắt đầu làm bài

## 🔧 Cấu hình

### Thông tin thanh toán (trong `script.js`)
- Số Zalo: `0987654321`
- Link Zalo: `https://zalo.me/0987654321`
- Ngân hàng: MB Bank
- Số tài khoản: 0123456789
- Chủ tài khoản: NGUYEN VAN A

### Thông tin liên hệ
- Email: trcuong12112008@gmail.com
- Phone: 0348908243

## 👥 Đội ngũ

- **Trần Nguyễn Chí Cường** - Founder & Operator
  - Email: trcuong12112008@gmail.com
- **Nguyễn Nhật Trường** - Co-Founder

## 🎯 Tính năng mở rộng (trong tương lai)

Các tính năng đã được comment trong code `tao-de-thi.js`:
- Lưu đề vào tài khoản học sinh
- Random câu hỏi
- Chấm điểm tự động
- Thống kê điểm
- Xuất PDF đề
- Import câu hỏi từ Excel
- Tạo mã đề ngẫu nhiên
- Chia sẻ đề thi

## 📄 License

© 2026 EduPass. All rights reserved.
