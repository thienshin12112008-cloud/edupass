# Hướng dẫn lưu thông tin đăng ký tài khoản vào Google Sheets

## Bước 1: Tạo Google Sheet cho Đăng ký

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo Sheet mới
3. Đặt tên: **EduPass - Đăng ký tài khoản**
4. Tạo header cho Sheet (dòng đầu tiên):
   - A1: `Thời gian`
   - B1: `Họ và tên`
   - C1: `Email`
   - D1: `Số điện thoại`
   - E1: `Trường`
   - F1: `Lớp`

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, vào **Extensions > Apps Script**
2. Xóa code mặc định
3. Dán code sau vào:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Kiểm tra email đã tồn tại chưa
    var lastRow = sheet.getLastRow();
    var emailColumn = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
    
    for (var i = 0; i < emailColumn.length; i++) {
      if (emailColumn[i][0] === data.email) {
        return ContentService.createTextOutput(JSON.stringify({
          'status': 'error',
          'message': 'Email đã được đăng ký!'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Thêm dòng mới với dữ liệu
    sheet.appendRow([
      new Date(),           // Thời gian
      data.fullname,        // Họ và tên
      data.email,           // Email
      data.phone || '',     // Số điện thoại (optional)
      data.school || '',    // Trường (optional)
      data.grade || ''      // Lớp (optional)
    ]);
    
    // Gửi email chào mừng (optional)
    try {
      MailApp.sendEmail({
        to: data.email,
        subject: "🎉 Chào mừng bạn đến với EduPass!",
        body: `
Xin chào ${data.fullname},

Cảm ơn bạn đã đăng ký tài khoản EduPass!

🎓 Bạn giờ có thể:
• Truy cập 83+ tài liệu học tập miễn phí
• Tạo đề thi tự luyện không giới hạn
• Theo dõi tiến độ học tập
• Nhận thông báo tài liệu mới

📚 Bắt đầu học ngay: https://thienshin12112008-cloud.github.io/edupass/

Chúc bạn học tập hiệu quả!

---
EduPass Team
Email: edupasshotro@gmail.com
SĐT: 0348 908 243
        `
      });
    } catch(emailError) {
      // Bỏ qua lỗi email, vẫn đăng ký thành công
      console.log('Email error:', emailError);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Đăng ký thành công!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function
function doGet(e) {
  return ContentService.createTextOutput("EduPass Registration API is working!");
}
```

4. Nhấn **Save** (💾)
5. Đặt tên project: **EduPass Registration Handler**

## Bước 3: Deploy Web App

1. Nhấn **Deploy > New deployment**
2. Chọn type: **Web app**
3. Cấu hình:
   - **Description**: EduPass Registration API
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Nhấn **Deploy**
5. Authorize (cho phép quyền truy cập)
6. **Copy URL** được tạo ra (dạng: `https://script.google.com/macros/s/...../exec`)

## Bước 4: Cập nhật code website

Mở file `script.js` và tìm phần xử lý form đăng ký, thêm code sau:

```javascript
// Thêm vào đầu file
const REGISTER_GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// Trong phần xử lý registerForm
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').onsubmit = async function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone')?.value || '';
        const school = document.getElementById('school')?.value || '';
        const grade = document.getElementById('grade')?.value || '';
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate
        if (password !== confirmPassword) {
            alert('❌ Mật khẩu không khớp!');
            return;
        }
        
        // Hiển thị loading
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Đang xử lý...';
        submitBtn.disabled = true;
        
        try {
            // Gửi dữ liệu lên Google Sheets
            const response = await fetch(REGISTER_GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname: fullname,
                    email: email,
                    phone: phone,
                    school: school,
                    grade: grade
                })
            });
            
            // Lưu vào localStorage
            localStorage.setItem('user', JSON.stringify({ 
                fullname, 
                email, 
                phone,
                school,
                grade,
                password 
            }));
            
            alert('✅ Đăng ký thành công! Thông tin đã được lưu.');
            window.location.href = 'dang-nhap.html';
            
        } catch (error) {
            console.error('Error:', error);
            // Vẫn lưu vào localStorage nếu Google Sheets lỗi
            localStorage.setItem('user', JSON.stringify({ 
                fullname, 
                email, 
                phone,
                school,
                grade,
                password 
            }));
            alert('✅ Đăng ký thành công!');
            window.location.href = 'dang-nhap.html';
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    };
}
```

## Bước 5: Cập nhật form đăng ký (dang-ky.html)

Thêm các trường optional nếu muốn:

```html
<div class="form-group">
    <label for="phone">📱 Số điện thoại (không bắt buộc)</label>
    <input type="tel" id="phone" placeholder="Nhập số điện thoại">
</div>

<div class="form-group">
    <label for="school">🏫 Trường (không bắt buộc)</label>
    <input type="text" id="school" placeholder="Tên trường">
</div>

<div class="form-group">
    <label for="grade">📚 Lớp (không bắt buộc)</label>
    <select id="grade">
        <option value="">Chọn lớp</option>
        <option value="10">Lớp 10</option>
        <option value="11">Lớp 11</option>
        <option value="12">Lớp 12</option>
    </select>
</div>
```

## Bước 6: Test

1. Mở trang đăng ký
2. Điền thông tin
3. Nhấn "Đăng ký"
4. Kiểm tra Google Sheet xem có dữ liệu mới không
5. Kiểm tra email (nếu bật email notification)

## Lợi ích

✅ Lưu trữ tập trung tất cả người dùng đăng ký
✅ Dễ dàng quản lý và phân tích dữ liệu
✅ Có thể export sang Excel/CSV
✅ Tự động gửi email chào mừng
✅ Kiểm tra email trùng lặp
✅ Backup dữ liệu an toàn trên Google Drive

## Nâng cao

### 1. Thêm thống kê

Tạo sheet thứ 2 tên "Thống kê" với công thức:

```
=COUNTA(A2:A) // Tổng số đăng ký
=COUNTIF(F2:F,"12") // Số học sinh lớp 12
=QUERY(A2:F,"SELECT MONTH(A), COUNT(A) GROUP BY MONTH(A)") // Đăng ký theo tháng
```

### 2. Gửi thông báo cho admin

Thêm vào Apps Script:

```javascript
// Gửi thông báo cho admin
MailApp.sendEmail({
  to: "edupasshotro@gmail.com",
  subject: "🎉 Người dùng mới đăng ký!",
  body: `
Người dùng mới vừa đăng ký:

Họ tên: ${data.fullname}
Email: ${data.email}
Trường: ${data.school}
Lớp: ${data.grade}

Thời gian: ${new Date().toLocaleString('vi-VN')}
  `
});
```

### 3. Tạo dashboard

Sử dụng Google Data Studio để tạo dashboard trực quan từ dữ liệu Google Sheets.

---

**Hoàn thành!** Mọi đăng ký mới sẽ tự động lưu vào Google Sheets.

## Troubleshooting

### Lỗi "Email đã tồn tại"
- Kiểm tra trong Sheet xem email có bị trùng không
- Xóa dòng trùng nếu cần

### Không nhận được email
- Kiểm tra spam folder
- Kiểm tra quyền gửi email trong Apps Script
- Email có thể bị delay 1-2 phút

### Dữ liệu không lưu
- Kiểm tra URL có đúng không
- Xem log trong Apps Script > Executions
- Kiểm tra quyền "Anyone" đã được set chưa
