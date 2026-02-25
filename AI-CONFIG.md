# Cấu hình EduPass AI - Hướng dẫn tích hợp AI thật

## 🤖 Tổng quan

EduPass AI hiện hỗ trợ 2 chế độ:

1. **Rule-based Mode** (Mặc định) - Không cần API key, trả lời dựa trên từ khóa
2. **AI Mode** - Tích hợp với OpenAI/Gemini API, có khả năng tự học và trả lời thông minh

## 📋 Tính năng AI Mode

✅ Tự động học từ lịch sử hội thoại
✅ Hiểu ngữ cảnh và trả lời thông minh hơn
✅ Lưu lịch sử hội thoại vào localStorage
✅ Tích hợp với OpenAI GPT-3.5/GPT-4 hoặc Google Gemini
✅ Tự động xây dựng context từ 5 tin nhắn gần nhất

## 🏫 Thông tin về EduPass

### Về dự án
- **Tên:** EduPass - Nền tảng học tập thông minh cho học sinh THPT
- **Slogan:** Learn today. Pass tomorrow.
- **Mục tiêu:** Kiến tạo không gian học tập trực tuyến nơi học sinh có thể học thông minh hơn, ôn luyện hiệu quả hơn và chủ động hơn trên con đường chinh phục tri thức
- **Đơn vị thực hiện:** Nhóm học sinh Trường THCS-THPT Hòa Bình

### Đội ngũ sáng lập

**Founder & Operator:**
- **Trần Nguyễn Chí Cường**
  - Email: trcuong12112008@gmail.com
  - SĐT: 0348 908 243 / 0876 422 788
  - Vai trò: Phát triển và vận hành toàn bộ hệ thống nền tảng EduPass, xây dựng kho tài liệu và ngân hàng đề luyện thi bám sát chương trình THPT

**Thành viên đồng sáng lập:**
1. **Phạm Như Anh** - Content & Learning Material Support
2. **Lê Hoàng Gia Huy** - Idea Development & Operation Support
3. **Hồ Nguyễn Trúc Ngân** - Design & Learning Experience Support
4. **Nguyễn Minh Tiến** - Learning Resource & Exam Bank Development
5. **Nguyễn Gia Hòa** - Content & Project Support
6. **Lê Nhất Duy** - Project & Community Support

### Hành trình phát triển

1. **Giai đoạn ý tưởng** - Khởi nguồn từ nhu cầu học tập
   - Xuất phát từ những trăn trở của học sinh THPT về khối lượng kiến thức lớn, áp lực thi cử và tài liệu ôn tập rời rạc

2. **Giai đoạn xây dựng** - Những bước đi đầu tiên
   - Nghiên cứu, thiết kế và phát triển phiên bản đầu tiên với các tính năng cơ bản

3. **Giai đoạn phát triển nội dung** - Hoàn thiện giá trị học tập
   - Xây dựng kho tài liệu và đề luyện thi bám sát chương trình THPT

4. **Giai đoạn tích hợp công nghệ** - Ứng dụng AI vào học tập
   - Tích hợp AI để hỗ trợ giải bài, tạo đề tự luyện và cá nhân hóa quá trình ôn tập

5. **Giai đoạn mở rộng** - Đồng hành cùng học sinh
   - Hoàn thiện hệ sinh thái học tập, trở thành người bạn đồng hành đáng tin cậy

### Tính năng chính

- **Kho tài liệu:** Tài liệu chất lượng cao được biên soạn bởi giáo viên, bám sát chương trình THPT
- **Luyện thi:** Hàng ngàn đề thi từ cơ bản đến nâng cao với hệ thống chấm điểm tự động
- **Tạo đề thi:** Công cụ tạo đề thi tùy chỉnh theo nhu cầu
- **AI Chat:** Trợ lý AI hỗ trợ học tập 24/7
- **Môn học:** Toán, Vật Lý, Hóa, Ngữ Văn, Lịch Sử, Địa Lí, Sinh học, Tiếng Anh, GDCD, Kinh tế & Pháp luật, Công nghệ, Tin học

### Liên hệ
- **Email:** trcuong12112008@gmail.com
- **Điện thoại:** 0348 908 243 / 0876 422 788
- **Website:** [Các trang chính]
  - Trang chủ: index.html
  - Kho tài liệu: tai-lieu.html
  - Luyện thi: luyen-thi.html
  - Tạo đề thi: tao-de-thi.html
  - Câu chuyện EduPass: cau-chuyen.html
  - Hành trình EduPass: hanh-trinh-edupass.html

## 🔧 Cách bật AI Mode

### Bước 1: Lấy API Key

#### Option 1: OpenAI (Khuyên dùng)
1. Truy cập: https://platform.openai.com/api-keys
2. Đăng ký/Đăng nhập tài khoản
3. Tạo API key mới
4. Copy API key (bắt đầu bằng `sk-...`)

**Chi phí:** ~$0.002 per 1000 tokens (rất rẻ)

#### Option 2: Google Gemini (Miễn phí)
1. Truy cập: https://makersuite.google.com/app/apikey
2. Tạo API key
3. Copy API key

**Chi phí:** Miễn phí (có giới hạn)

### Bước 2: Cấu hình trong code

Mở file `edupass-ai.js` và chỉnh sửa:

```javascript
class EduPassAI {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.conversationHistory = [];
        
        // ===== BẬT AI MODE =====
        this.useAIMode = true; // Đổi từ false → true
        
        // ===== THÊM API KEY =====
        this.apiKey = 'sk-your-api-key-here'; // Dán API key vào đây
        
        // ===== CHỌN ENDPOINT =====
        // OpenAI:
        this.apiEndpoint = 'https://api.openai.com/v1/chat/completions';
        
        // Hoặc Gemini:
        // this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        
        this.init();
    }
}
```

### Bước 3: Chọn Model (OpenAI)

Trong hàm `getAIResponse()`, chọn model:

```javascript
body: JSON.stringify({
    model: 'gpt-3.5-turbo', // Rẻ, nhanh
    // model: 'gpt-4', // Thông minh hơn nhưng đắt hơn
    messages: messages,
    temperature: 0.7,
    max_tokens: 500
})
```

**So sánh models:**
- `gpt-3.5-turbo`: $0.002/1K tokens - Nhanh, rẻ, đủ tốt
- `gpt-4`: $0.03/1K tokens - Thông minh hơn, đắt hơn 15x

## 🔒 Bảo mật API Key

⚠️ **QUAN TRỌNG:** Không commit API key lên GitHub!

### Cách bảo mật:

#### Option 1: Environment Variables (Khuyên dùng)
```javascript
this.apiKey = process.env.OPENAI_API_KEY || '';
```

#### Option 2: Config file riêng (không commit)
Tạo file `ai-config.js`:
```javascript
const AI_CONFIG = {
    apiKey: 'sk-your-key-here',
    endpoint: 'https://api.openai.com/v1/chat/completions'
};
```

Thêm vào `.gitignore`:
```
ai-config.js
```

#### Option 3: Backend Proxy (An toàn nhất)
Tạo backend API để gọi OpenAI, không để API key ở frontend.

## 📊 Tính năng tự học

AI sẽ tự động:
1. Lưu lịch sử hội thoại vào `localStorage`
2. Sử dụng 5 tin nhắn gần nhất làm context
3. Học từ cách người dùng hỏi và trả lời
4. Cải thiện độ chính xác theo thời gian

## 🧪 Test AI Mode

1. Bật AI Mode và thêm API key
2. Mở website và click vào nút AI
3. Hỏi: "Giải thích định lý Pythagore"
4. AI sẽ trả lời chi tiết và thông minh

## 💰 Chi phí ước tính

**OpenAI GPT-3.5-turbo:**
- 1 cuộc hội thoại (10 tin nhắn): ~$0.01
- 100 người dùng/ngày: ~$1/ngày = $30/tháng
- 1000 người dùng/ngày: ~$10/ngày = $300/tháng

**Google Gemini:**
- Miễn phí: 60 requests/phút
- Đủ cho website nhỏ/vừa

## 🔄 Chuyển đổi giữa Rule-based và AI Mode

```javascript
// Rule-based (Miễn phí, không cần API)
this.useAIMode = false;

// AI Mode (Thông minh, cần API key)
this.useAIMode = true;
```

## 📝 Tùy chỉnh System Prompt

Chỉnh sửa trong hàm `getAIResponse()`:

```javascript
{
    role: 'system',
    content: `Bạn là EduPass AI - Trợ lý học tập thông minh cho học sinh THPT.
    
    THÔNG TIN VỀ EDUPASS:
    - Tên: EduPass - Nền tảng học tập thông minh cho học sinh THPT
    - Slogan: Learn today. Pass tomorrow.
    - Founder: Trần Nguyễn Chí Cường (Email: trcuong12112008@gmail.com, SĐT: 0348 908 243 / 0876 422 788)
    - Đơn vị: Nhóm học sinh Trường THCS-THPT Hòa Bình
    
    TÍNH NĂNG CHÍNH:
    - Kho tài liệu: Tài liệu chất lượng cao bám sát chương trình THPT
    - Luyện thi: Hàng ngàn đề thi với chấm điểm tự động
    - Tạo đề thi: Công cụ tạo đề thi tùy chỉnh
    - AI Chat: Trợ lý AI hỗ trợ 24/7
    
    MÔN HỌC HỖ TRỢ:
    Toán, Vật Lý, Hóa, Ngữ Văn, Lịch Sử, Địa Lí, Sinh học, Tiếng Anh, GDCD, Kinh tế & Pháp luật, Công nghệ, Tin học
    
    HƯỚNG DẪN TRẢ LỜI:
    - Trả lời ngắn gọn, dễ hiểu, phù hợp với học sinh THPT
    - Sử dụng emoji phù hợp để tạo sự thân thiện
    - Luôn khuyến khích và động viên học sinh
    - Khi được hỏi về thông tin liên hệ, cung cấp email và số điện thoại
    - Khi được hỏi về đội ngũ, giới thiệu founder và các thành viên
    - Hướng dẫn học sinh sử dụng các tính năng của EduPass
    `
}
```

## 🐛 Troubleshooting

### Lỗi: "API request failed"
- Kiểm tra API key có đúng không
- Kiểm tra còn credit trong tài khoản không
- Kiểm tra endpoint có đúng không

### Lỗi: CORS
- Cần setup backend proxy
- Hoặc dùng Cloudflare Workers

### AI trả lời chậm
- Giảm `max_tokens` xuống 300
- Dùng `gpt-3.5-turbo` thay vì `gpt-4`

## 📚 Tài liệu tham khảo

- OpenAI API: https://platform.openai.com/docs
- Gemini API: https://ai.google.dev/docs
- Pricing: https://openai.com/pricing

## 🎯 Khuyến nghị

**Cho website nhỏ (< 100 users/day):**
- Dùng Rule-based mode (miễn phí)
- Hoặc Google Gemini (miễn phí)

**Cho website vừa (100-1000 users/day):**
- Dùng OpenAI GPT-3.5-turbo
- Chi phí: ~$30-300/tháng

**Cho website lớn (> 1000 users/day):**
- Setup backend proxy
- Cache câu trả lời phổ biến
- Dùng GPT-3.5-turbo + fine-tuning

---

💡 **Lưu ý:** Hiện tại AI đang ở chế độ Rule-based (miễn phí). Để bật AI thông minh, làm theo hướng dẫn trên!
