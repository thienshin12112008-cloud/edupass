# Hướng dẫn kết nối Form với Google Sheets

## Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo Sheet mới
3. Đặt tên: **EduPass - Góp ý & Câu hỏi**
4. Tạo header cho Sheet (dòng đầu tiên):
   - A1: `Thời gian`
   - B1: `Họ tên`
   - C1: `Email`
   - D1: `Số điện thoại`
   - E1: `Tiêu đề`
   - F1: `Nội dung`

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, vào **Extensions > Apps Script**
2. Xóa code mặc định
3. Dán code sau vào:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Thêm dòng mới với dữ liệu
    sheet.appendRow([
      new Date(),           // Thời gian
      data.name,            // Họ tên
      data.email,           // Email
      data.phone,           // Số điện thoại
      data.subject,         // Tiêu đề
      data.message          // Nội dung
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Đã gửi thành công!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function doGet(e) {
  return ContentService.createTextOutput("Google Apps Script is working!");
}
```

4. Nhấn **Save** (💾)
5. Đặt tên project: **EduPass Form Handler**

## Bước 3: Deploy Web App

1. Nhấn **Deploy > New deployment**
2. Chọn type: **Web app**
3. Cấu hình:
   - **Description**: EduPass Contact Form
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Nhấn **Deploy**
5. Authorize (cho phép quyền truy cập)
6. **Copy URL** được tạo ra (dạng: `https://script.google.com/macros/s/...../exec`)

## Bước 4: Cập nhật code website

1. Mở file `script.js`
2. Tìm dòng:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```
3. Thay `YOUR_GOOGLE_APPS_SCRIPT_URL` bằng URL vừa copy
4. Ví dụ:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxx.../exec';
```

## Bước 5: Test

1. Mở website
2. Điền form liên hệ
3. Nhấn "Gửi câu hỏi"
4. Kiểm tra Google Sheet xem có dữ liệu mới không

## Lưu ý

- Mỗi lần sửa code Apps Script, cần **Deploy lại** (Deploy > New deployment)
- Dữ liệu sẽ tự động lưu vào Sheet theo thời gian thực
- Có thể thêm email notification trong Apps Script nếu muốn nhận thông báo

## Troubleshooting

### Lỗi CORS
- Đây là lỗi bình thường khi dùng `mode: 'no-cors'`
- Dữ liệu vẫn được gửi thành công
- Không ảnh hưởng đến chức năng

### Không nhận được dữ liệu
1. Kiểm tra URL có đúng không
2. Kiểm tra quyền "Anyone" đã được set chưa
3. Xem log trong Apps Script: **Executions**

### Cần sửa code
1. Sửa code trong Apps Script
2. **Deploy > Manage deployments**
3. Chọn deployment hiện tại
4. Nhấn **Edit** (✏️)
5. **Version**: New version
6. **Deploy**

## Nâng cao: Thêm Email Notification

Thêm vào cuối hàm `doPost()`:

```javascript
// Gửi email thông báo
MailApp.sendEmail({
  to: "trcuong12112008@gmail.com",
  subject: "📧 Câu hỏi mới từ " + data.name,
  body: `
Họ tên: ${data.name}
Email: ${data.email}
SĐT: ${data.phone}
Tiêu đề: ${data.subject}

Nội dung:
${data.message}

---
Gửi lúc: ${new Date().toLocaleString('vi-VN')}
  `
});
```

---

**Hoàn thành!** Form giờ sẽ tự động lưu vào Google Sheets.
