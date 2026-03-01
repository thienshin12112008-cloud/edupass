// EduPass AI Assistant

class EduPassAI {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.conversationHistory = [];
        
        // ===== CẤU HÌNH AI =====
        this.useAIMode = true; // Bật AI Mode
        this.aiProvider = 'gemini'; // 'openai' hoặc 'gemini'
        this.apiKey = 'AIzaSyBspcajASjRiqulGOxmRIkAtpWB6j1-Dd0'; // Google Gemini API Key
        
        // API Endpoints
        this.endpoints = {
            openai: 'https://api.openai.com/v1/chat/completions',
            gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
        };
        
        this.init();
    }

    init() {
        this.loadConversationHistory();
        this.createChatUI();
        this.attachEventListeners();
        this.showWelcomeMessage();
    }

    createChatUI() {
        const chatHTML = `
            <!-- AI Greeting Bubble -->
            <div class="ai-greeting-bubble" id="aiGreetingBubble">
                <button class="greeting-close" onclick="window.edupassAI.closeGreeting()">×</button>
                <div class="greeting-header">
                    <div class="greeting-avatar">
                        <img src="assets/ai-logo.png" alt="EduPass AI">
                    </div>
                    <div class="greeting-title">EduPass AI</div>
                </div>
                <div class="greeting-message" id="greetingMessage">
                    Xin chào! Mình là trợ lý học tập của bạn. Cần mình giúp gì không? 😊
                </div>
                <div class="greeting-actions">
                    <button class="greeting-btn greeting-btn-primary" onclick="window.edupassAI.openChatFromGreeting()">
                        💬 Chat ngay
                    </button>
                    <button class="greeting-btn greeting-btn-secondary" onclick="window.edupassAI.closeGreeting()">
                        Để sau
                    </button>
                </div>
            </div>

            <!-- AI Chat Button -->
            <button class="ai-chat-button" id="aiChatButton">
                <img src="assets/ai-logo.png" alt="EduPass AI">
                <span class="ai-notification-badge" id="aiNotificationBadge" style="display: none;">1</span>
            </button>

            <!-- AI Chat Window -->
            <div class="ai-chat-window" id="aiChatWindow">
                <div class="ai-chat-header">
                    <div class="ai-chat-header-left">
                        <div class="ai-avatar">
                            <img src="assets/ai-logo.png" alt="EduPass AI">
                        </div>
                        <div class="ai-info">
                            <h3>EduPass AI</h3>
                            <div class="ai-status">
                                <span class="status-dot"></span>
                                <span>Trực tuyến</span>
                            </div>
                        </div>
                    </div>
                    <button class="ai-close-btn" id="aiCloseBtn">×</button>
                </div>

                <div class="ai-chat-messages" id="aiChatMessages">
                    <!-- Messages will be added here -->
                </div>

                <div class="ai-quick-actions" id="aiQuickActions">
                    <button class="quick-action-btn" data-action="exam">📝 Tạo đề thi</button>
                    <button class="quick-action-btn" data-action="material">📚 Tìm tài liệu</button>
                    <button class="quick-action-btn" data-action="help">❓ Hướng dẫn</button>
                </div>

                <div class="ai-chat-input">
                    <input type="text" id="aiMessageInput" placeholder="Nhập câu hỏi của bạn...">
                    <button class="ai-send-btn" id="aiSendBtn">📤</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        const chatButton = document.getElementById('aiChatButton');
        const closeBtn = document.getElementById('aiCloseBtn');
        const sendBtn = document.getElementById('aiSendBtn');
        const messageInput = document.getElementById('aiMessageInput');
        const quickActions = document.querySelectorAll('.quick-action-btn');

        chatButton.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickActions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('aiChatWindow');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatWindow.classList.add('active');
            document.getElementById('aiNotificationBadge').style.display = 'none';
            document.getElementById('aiMessageInput').focus();
        } else {
            chatWindow.classList.remove('active');
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('aiChatWindow').classList.remove('active');
    }

    showWelcomeMessage() {
        setTimeout(() => {
            const timeGreeting = this.getTimeGreeting();
            const isReturningUser = localStorage.getItem('edupass_returning_user');
            
            let greetingMsg = '';
            let fullMsg = '';
            
            if (isReturningUser) {
                // Returning user
                greetingMsg = `${timeGreeting}! Chào mừng bạn quay lại! 👋`;
                fullMsg = `${timeGreeting}! 👋\n\nChào mừng bạn quay lại EduPass! Hôm nay bạn muốn học gì?\n\n💡 Gợi ý:\n• Làm đề thi ôn tập\n• Xem tài liệu mới\n• Kiểm tra tiến độ học tập\n\nMình có thể giúp gì cho bạn?`;
            } else {
                // First time
                greetingMsg = `${timeGreeting}! Mình là EduPass AI, trợ lý học tập của bạn. Cần mình giúp gì không? 😊`;
                fullMsg = `${timeGreeting}! 👋\n\nChào mừng bạn đến với EduPass!\n\nMình là EduPass AI, trợ lý học tập thông minh. Mình có thể giúp bạn:\n• Tư vấn phương pháp học 12 môn\n• Hướng dẫn tạo đề thi tự luyện\n• Tìm tài liệu học tập chất lượng\n• Giải đáp thắc mắc về học tập\n\n💬 Hãy hỏi mình bất cứ điều gì nhé!`;
                localStorage.setItem('edupass_returning_user', 'true');
            }
            
            // Show greeting bubble
            this.showGreetingBubble(greetingMsg);
            
            // Add full message to chat (hidden until opened)
            this.addMessage('ai', fullMsg);
            
            // Add greeting animation to button
            const chatButton = document.getElementById('aiChatButton');
            if (chatButton && !this.isOpen) {
                chatButton.classList.add('greeting');
                setTimeout(() => {
                    chatButton.classList.remove('greeting');
                }, 2000);
            }
        }, 1500);
    }

    showGreetingBubble(message) {
        const bubble = document.getElementById('aiGreetingBubble');
        const messageEl = document.getElementById('greetingMessage');
        
        if (bubble && messageEl) {
            messageEl.textContent = message;
            bubble.classList.add('show');
            
            // Auto hide after 10 seconds
            setTimeout(() => {
                if (!this.isOpen) {
                    bubble.classList.remove('show');
                }
            }, 10000);
        }
    }

    closeGreeting() {
        const bubble = document.getElementById('aiGreetingBubble');
        if (bubble) {
            bubble.classList.remove('show');
        }
    }

    openChatFromGreeting() {
        this.closeGreeting();
        if (!this.isOpen) {
            this.toggleChat();
        }
    }

    getUserName() {
        // Disable auto name detection - always return null
        // Users can be greeted without showing their name
        return null;
        
        /* Original code - commented out
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (currentUser.name) {
            return currentUser.name.split(' ')[0]; // Get first name only
        }
        return null;
        */
    }

    getTimeGreeting() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 11) {
            return 'Chào buổi sáng';
        } else if (hour >= 11 && hour < 13) {
            return 'Chào buổi trưa';
        } else if (hour >= 13 && hour < 18) {
            return 'Chào buổi chiều';
        } else if (hour >= 18 && hour < 22) {
            return 'Chào buổi tối';
        } else {
            return 'Chào bạn';
        }
    }

    sendMessage() {
        const input = document.getElementById('aiMessageInput');
        const message = input.value.trim();

        if (!message) return;

        this.addMessage('user', message);
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Use AI API or rule-based response
        if (this.useAIMode && this.apiKey) {
            this.getAIResponse(message);
        } else {
            // Simulate AI response with rule-based
            setTimeout(() => {
                this.hideTypingIndicator();
                this.generateResponse(message);
            }, 1500);
        }
    }

    addMessage(sender, text) {
        const messagesContainer = document.getElementById('aiChatMessages');
        const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

        const avatarContent = sender === 'ai' 
            ? '<img src="assets/ai-logo.png" alt="AI">' 
            : '👤';

        const messageHTML = `
            <div class="ai-message ${sender}">
                <div class="message-avatar ${sender}">
                    ${avatarContent}
                </div>
                <div class="message-content">
                    <div class="message-bubble">${text.replace(/\n/g, '<br>')}</div>
                    <div class="message-time">${time}</div>
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.messages.push({ sender, text, time });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('aiChatMessages');
        const typingHTML = `
            <div class="ai-message ai" id="typingIndicator">
                <div class="message-avatar ai">
                    <img src="assets/ai-logo.png" alt="AI">
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <div class="typing-indicator">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let response = '';

        // Advanced keyword matching with more intelligence
        
        // Toán học
        if (message.includes('toán') || message.includes('math') || message.includes('tính') || 
            message.includes('phương trình') || message.includes('hình học') || message.includes('đại số')) {
            if (message.includes('học') || message.includes('cách')) {
                response = '📐 Để học Toán hiệu quả:\n\n1. Hiểu bản chất, không học vẹt công thức\n2. Làm nhiều bài tập từ dễ đến khó\n3. Vẽ hình, sơ đồ để hình dung\n4. Ôn lại kiến thức cũ thường xuyên\n5. Tham gia nhóm học để thảo luận\n\n💡 Mẹo: Mỗi ngày làm 5-10 bài, kiên trì là chìa khóa!';
            } else if (message.includes('khó') || message.includes('không hiểu')) {
                response = '🤔 Toán khó à? Đừng lo!\n\n✨ Bí quyết:\n• Chia nhỏ bài toán thành từng bước\n• Tìm bài tương tự đã làm được\n• Vẽ hình minh họa\n• Hỏi thầy cô hoặc bạn bè\n• Xem video giải thích trên YouTube\n\n📚 EduPass có nhiều đề thi Toán để luyện tập!';
            } else {
                response = '📐 Môn Toán trên EduPass:\n\n• Đề thi từ lớp 6-12\n• Tài liệu lý thuyết đầy đủ\n• Bài tập có lời giải chi tiết\n• Đề thi thử THPT Quốc gia\n\n🎯 Bạn đang học lớp mấy? Mình sẽ gợi ý tài liệu phù hợp!';
            }
        }
        
        // Vật Lý
        else if (message.includes('lý') || message.includes('vật lý') || message.includes('physics')) {
            response = '⚛️ Vật Lý - Môn học thú vị!\n\n💡 Cách học hiệu quả:\n• Hiểu rõ định nghĩa, công thức\n• Liên hệ với thực tế đời sống\n• Làm bài tập thực hành\n• Ghi nhớ đơn vị đo lường\n• Vẽ sơ đồ, hình minh họa\n\n📚 EduPass có:\n• Lý thuyết từ cơ bản đến nâng cao\n• Bài tập có lời giải\n• Đề thi thử\n\nBạn cần tài liệu phần nào?';
        }
        
        // Hóa học
        else if (message.includes('hóa') || message.includes('chemistry') || message.includes('phản ứng')) {
            response = '🧪 Hóa học - Khoa học của sự biến đổi!\n\n🎯 Bí quyết học Hóa:\n• Học thuộc bảng tuần hoàn\n• Nắm vững công thức hóa học\n• Hiểu cơ chế phản ứng\n• Làm bài tập cân bằng phương trình\n• Liên hệ với đời sống\n\n⚗️ Mẹo: Tạo flashcard cho các phản ứng quan trọng!\n\nBạn đang học Hóa lớp mấy?';
        }
        
        // Ngữ Văn
        else if (message.includes('văn') || message.includes('ngữ văn') || message.includes('thơ') || 
                 message.includes('văn học') || message.includes('phân tích')) {
            response = '📖 Ngữ Văn - Môn học của cảm xúc!\n\n✍️ Cách học Văn hiệu quả:\n• Đọc kỹ tác phẩm nhiều lần\n• Tìm hiểu tác giả, bối cảnh\n• Phân tích từng đoạn, câu\n• Học thuộc dàn ý bài văn mẫu\n• Luyện viết thường xuyên\n\n💭 Mẹo: Ghi chú cảm nhận riêng khi đọc!\n\nBạn cần phân tích tác phẩm nào?';
        }
        
        // Tiếng Anh
        else if (message.includes('anh') || message.includes('english') || message.includes('tiếng anh')) {
            response = '🇬🇧 Tiếng Anh - Ngôn ngữ toàn cầu!\n\n🎯 Cách học hiệu quả:\n• Học từ vựng theo chủ đề\n• Nghe - Nói - Đọc - Viết đều đặn\n• Xem phim, nghe nhạc tiếng Anh\n• Luyện ngữ pháp qua bài tập\n• Thực hành giao tiếp hàng ngày\n\n📱 Mẹo: Đổi ngôn ngữ điện thoại sang tiếng Anh!\n\nBạn muốn cải thiện kỹ năng nào?';
        }
        
        // Lịch Sử
        else if (message.includes('sử') || message.includes('lịch sử') || message.includes('history')) {
            response = '🏛️ Lịch Sử - Học từ quá khứ!\n\n📜 Cách học Sử hiệu quả:\n• Tạo timeline sự kiện\n• Hiểu nguyên nhân - kết quả\n• Liên hệ các sự kiện với nhau\n• Xem phim tài liệu lịch sử\n• Học theo chủ đề, giai đoạn\n\n🗺️ Mẹo: Vẽ sơ đồ tư duy cho mỗi chương!\n\nBạn đang học giai đoạn lịch sử nào?';
        }
        
        // Địa Lý
        else if (message.includes('địa') || message.includes('địa lý') || message.includes('geography')) {
            response = '🌍 Địa Lý - Khám phá thế giới!\n\n🗺️ Cách học Địa hiệu quả:\n• Sử dụng bản đồ, atlas\n• Học theo vùng, khu vực\n• Liên hệ với thời sự\n• Xem video về địa lý\n• Ghi nhớ số liệu quan trọng\n\n📍 Mẹo: Chơi game đoán quốc gia để nhớ lâu!\n\nBạn cần tài liệu Địa lý phần nào?';
        }
        
        // Sinh học
        else if (message.includes('sinh') || message.includes('sinh học') || message.includes('biology')) {
            response = '🧬 Sinh học - Khoa học sự sống!\n\n🔬 Cách học Sinh hiệu quả:\n• Hiểu quy trình, chu trình\n• Vẽ sơ đồ cơ quan, tế bào\n• Học thuộc thuật ngữ khoa học\n• Xem video mô phỏng\n• Liên hệ với cơ thể con người\n\n🌱 Mẹo: Tạo flashcard cho các khái niệm!\n\nBạn đang học chương nào?';
        }
        
        // Đề thi
        else if (message.includes('đề thi') || message.includes('tạo đề') || message.includes('luyện thi')) {
            response = '📝 Tạo đề thi tự luyện:\n\n🎯 Hướng dẫn:\n1. Vào <a href="tao-de-thi.html" style="color:#667eea">Tạo đề thi</a>\n2. Chọn môn học (12 môn)\n3. Nhập số câu hỏi (10-50 câu)\n4. Chọn độ khó (Dễ/TB/Khó)\n5. Tạo thủ công hoặc dán từ AI\n\n✨ Tính năng:\n• Tự động tính điểm\n• Lưu lịch sử làm bài\n• Xem đáp án chi tiết\n\nBạn muốn tạo đề môn gì?';
        }
        
        // Tài liệu
        else if (message.includes('tài liệu') || message.includes('tìm') || message.includes('download') || message.includes('tải')) {
            response = '📚 Kho tài liệu EduPass:\n\n🎯 Có gì:\n• Sách giáo khoa (SGK)\n• Sách bài tập (SBT)\n• Đề thi các năm\n• Tài liệu ôn thi THPT QG\n• Bài giảng, video\n\n🔍 Tìm kiếm theo:\n• Môn học (12 môn)\n• Lớp (6-12)\n• Loại (Miễn phí/Premium)\n\n👉 <a href="tai-lieu.html" style="color:#667eea">Xem kho tài liệu</a>\n\nBạn cần tài liệu môn gì, lớp mấy?';
        }
        
        // Điểm số
        else if (message.includes('điểm') || message.includes('kết quả') || message.includes('score') || message.includes('thống kê')) {
            response = '📊 Xem điểm và thống kê:\n\n📈 Tính năng:\n• Điểm các bài thi đã làm\n• Biểu đồ tiến bộ\n• So sánh với trung bình\n• Phân tích điểm mạnh/yếu\n• Gợi ý cải thiện\n\n👉 Vào <a href="tai-khoan.html" style="color:#667eea">Tài khoản</a> → Thống kê\n\n💡 Mẹo: Làm bài đều đặn để theo dõi tiến bộ!';
        }
        
        // Phương pháp học
        else if (message.includes('học') && (message.includes('cách') || message.includes('làm sao') || 
                 message.includes('phương pháp') || message.includes('hiệu quả'))) {
            response = '🎓 Phương pháp học hiệu quả:\n\n⭐ 5 Nguyên tắc vàng:\n1. Học đều đặn, không dồn dập\n2. Hiểu bản chất, không học vẹt\n3. Làm bài tập thực hành nhiều\n4. Ôn tập theo chu kỳ\n5. Nghỉ ngơi đầy đủ\n\n🧠 Kỹ thuật Pomodoro:\n• Học 25 phút → Nghỉ 5 phút\n• Sau 4 lần → Nghỉ 15-30 phút\n\n💪 Bạn học môn nào? Mình tư vấn cụ thể!';
        }
        
        // Thi cử
        else if (message.includes('thi') && (message.includes('thpt') || message.includes('quốc gia') || 
                 message.includes('đại học') || message.includes('tốt nghiệp'))) {
            response = '🎯 Ôn thi THPT Quốc gia:\n\n📅 Lộ trình:\n1. Ôn lý thuyết toàn bộ (3-4 tháng)\n2. Làm đề thi các năm (2 tháng)\n3. Luyện đề thi thử (1 tháng)\n4. Ôn lại kiến thức yếu (2 tuần)\n\n📚 EduPass hỗ trợ:\n• Đề thi THPT QG các năm\n• Đề thi thử các trường\n• Tài liệu ôn tập\n• Phân tích đề thi\n\n💪 Bạn thi khối nào? A, B, C hay D?';
        }
        
        // Đăng ký/Đăng nhập
        else if (message.includes('đăng ký') || message.includes('tài khoản') || message.includes('đăng nhập')) {
            response = '👤 Tài khoản EduPass:\n\n✨ Lợi ích khi đăng ký:\n• Lưu tiến độ học tập\n• Theo dõi điểm số\n• Tải tài liệu miễn phí\n• Tạo đề thi không giới hạn\n• Nhận thông báo tài liệu mới\n\n📝 Đăng ký ngay:\n1. Click <a href="dang-ky.html" style="color:#667eea">Đăng ký</a>\n2. Điền thông tin\n3. Xác nhận email\n4. Bắt đầu học!\n\n🎁 Miễn phí 100%!';
        }
        
        // Giá cả
        else if (message.includes('giá') || message.includes('phí') || message.includes('tiền') || message.includes('mua')) {
            response = '💰 Bảng giá EduPass:\n\n🆓 Miễn phí:\n• Tạo đề thi không giới hạn\n• Luyện thi trực tuyến\n• Tài liệu cơ bản\n• Xem điểm, thống kê\n\n⭐ Premium (10,000đ - 50,000đ):\n• Tài liệu chất lượng cao\n• Đề thi độc quyền\n• Video bài giảng\n• Hỗ trợ ưu tiên\n\n💎 VIP (Liên hệ):\n• Truy cập toàn bộ tài liệu\n• Gia sư online 1-1\n• Lộ trình cá nhân hóa';
        }
        
        // Môn học
        else if (message.includes('môn') || message.includes('subject')) {
            response = '📖 12 Môn học trên EduPass:\n\n🔢 Toán - Tư duy logic\n⚛️ Vật Lý - Khoa học tự nhiên\n🧪 Hóa học - Phản ứng hóa học\n📖 Ngữ Văn - Văn học Việt Nam\n🏛️ Lịch Sử - Dòng chảy lịch sử\n🌍 Địa Lý - Khám phá thế giới\n🧬 Sinh học - Khoa học sự sống\n🇬🇧 Tiếng Anh - Ngôn ngữ quốc tế\n⚖️ GDCD - Giáo dục công dân\n💼 KTPL - Kinh tế & Pháp luật\n⚙️ Công nghệ - Kỹ thuật\n💻 Tin học - Lập trình\n\nBạn muốn học môn nào?';
        }
        
        // Lời cảm ơn
        else if (message.includes('cảm ơn') || message.includes('thanks') || message.includes('thank')) {
            response = '😊 Không có gì! Rất vui được giúp bạn!\n\n💪 Chúc bạn học tập tốt và đạt kết quả cao!\n\n📚 Nếu cần gì, cứ hỏi mình nhé. Mình luôn ở đây để hỗ trợ bạn!\n\n🌟 Hãy nhớ: "Learn today. Pass tomorrow!"';
        }
        
        // Chào hỏi
        else if (message.includes('xin chào') || message.includes('hello') || message.includes('hi') || 
                 message.includes('chào') || message.includes('hey')) {
            response = '👋 Xin chào! Mình là EduPass AI!\n\n😊 Rất vui được gặp bạn! Mình có thể giúp bạn:\n\n📚 Tư vấn học tập\n📝 Hướng dẫn tạo đề thi\n🔍 Tìm tài liệu\n💡 Giải đáp thắc mắc\n🎯 Lộ trình ôn thi\n\nBạn cần mình hỗ trợ gì nào? 🚀';
        }
        
        // Động viên
        else if (message.includes('khó') || message.includes('stress') || message.includes('áp lực') || 
                 message.includes('mệt') || message.includes('chán')) {
            response = '💪 Đừng lo lắng, bạn làm được mà!\n\n🌟 Nhớ rằng:\n• Mọi người đều gặp khó khăn\n• Thất bại là bước đệm thành công\n• Kiên trì sẽ có kết quả\n• Nghỉ ngơi khi cần thiết\n• Đừng so sánh với người khác\n\n😊 Mẹo giảm stress:\n• Chia nhỏ mục tiêu\n• Thưởng cho bản thân\n• Tập thể dục, nghe nhạc\n• Nói chuyện với bạn bè\n\n💙 Bạn rất giỏi rồi, cố lên!';
        }
        
        // Mặc định - Thông minh hơn
        else {
            // Phân tích câu hỏi để đưa ra gợi ý tốt hơn
            const keywords = ['gì', 'sao', 'nào', 'như thế nào', 'làm', 'có', 'được', 'là'];
            const hasQuestion = keywords.some(kw => message.includes(kw));
            
            if (hasQuestion) {
                response = `🤔 Mình hiểu bạn đang hỏi: "${userMessage}"\n\n💡 Mình có thể giúp bạn về:\n\n📚 Học tập:\n• Phương pháp học 12 môn\n• Tư vấn lộ trình ôn thi\n• Giải đáp kiến thức\n\n🎯 Tính năng:\n• Tạo đề thi tự luyện\n• Tìm tài liệu học tập\n• Xem điểm và thống kê\n\n📞 Liên hệ:\n• Email: trcuong12112008@gmail.com\n• Zalo: 0348908243\n\nBạn muốn hỏi cụ thể về vấn đề gì?`;
            } else {
                response = `👋 Xin chào! Mình là EduPass AI.\n\n🎯 Bạn có thể hỏi mình:\n• "Cách học Toán hiệu quả?"\n• "Tìm tài liệu Lý lớp 12"\n• "Tạo đề thi Hóa học"\n• "Phương pháp ôn thi THPT"\n• "Giải thích [kiến thức]"\n\n💬 Hoặc chat tự do, mình sẽ cố gắng giúp bạn!\n\n📧 Liên hệ: trcuong12112008@gmail.com`;
            }
        }

        this.addMessage('ai', response);
        
        // Save to conversation history for learning
        this.conversationHistory.push({
            user: userMessage,
            ai: response,
            timestamp: new Date().toISOString()
        });
        this.saveConversationHistory();
    }

    // Real AI API Integration
    async getAIResponse(userMessage) {
        try {
            let aiResponse;
            
            if (this.aiProvider === 'gemini') {
                aiResponse = await this.callGeminiAPI(userMessage);
            } else {
                aiResponse = await this.callOpenAIAPI(userMessage);
            }

            this.hideTypingIndicator();
            this.addMessage('ai', aiResponse);

            // Save to conversation history
            this.conversationHistory.push({
                user: userMessage,
                ai: aiResponse,
                timestamp: new Date().toISOString()
            });
            this.saveConversationHistory();

        } catch (error) {
            console.error('AI API Error:', error);
            console.log('Falling back to rule-based response...');
            
            // Fallback to rule-based if API fails
            this.hideTypingIndicator();
            
            // Show error in console but use rule-based response
            console.warn('API Error Details:', error.message);
            
            // Use rule-based response as fallback
            this.generateResponse(userMessage);
        }
    }

    // Google Gemini API
    async callGeminiAPI(userMessage) {
        try {
            // Build context from conversation history
            let contextText = `Bạn là EduPass AI, trợ lý học tập thông minh của nền tảng EduPass - một website học tập trực tuyến cho học sinh THPT Việt Nam.

THÔNG TIN VỀ EDUPASS:
- Tên đầy đủ: EduPass - Nền tảng học tập thông minh cho học sinh THPT
- Slogan: "Learn today. Pass tomorrow"
- Đơn vị thực hiện: Nhóm học sinh Trường THCS-THPT Hòa Bình
- Mục tiêu: Kiến tạo không gian học tập trực tuyến nơi học sinh có thể học thông minh hơn, ôn luyện hiệu quả hơn và chủ động hơn trên con đường chinh phục tri thức

ĐỘI NGŨ SÁNG LẬP:
Founder & Operator:
- Trần Nguyễn Chí Cường
- Email: trcuong12112008@gmail.com
- SĐT: 0348 908 243 / 0876 422 788
- Vai trò: Phát triển và vận hành toàn bộ hệ thống nền tảng EduPass, xây dựng kho tài liệu và ngân hàng đề luyện thi bám sát chương trình THPT

Thành viên đồng sáng lập:
1. Phạm Như Anh - Content & Learning Material Support
2. Lê Hoàng Gia Huy - Idea Development & Operation Support
3. Hồ Nguyễn Trúc Ngân - Design & Learning Experience Support
4. Nguyễn Minh Tiến - Learning Resource & Exam Bank Development
5. Nguyễn Gia Hòa - Content & Project Support
6. Lê Nhất Duy - Project & Community Support

HÀNH TRÌNH PHÁT TRIỂN:
1. Giai đoạn ý tưởng - Khởi nguồn từ nhu cầu học tập
2. Giai đoạn xây dựng - Những bước đi đầu tiên
3. Giai đoạn phát triển nội dung - Hoàn thiện giá trị học tập
4. Giai đoạn tích hợp công nghệ - Ứng dụng AI vào học tập
5. Giai đoạn mở rộng - Đồng hành cùng học sinh

TÍNH NĂNG CHÍNH:
- Kho tài liệu: Tài liệu chất lượng cao được biên soạn bởi giáo viên, bám sát chương trình THPT
- Luyện thi: Hàng ngàn đề thi từ cơ bản đến nâng cao với hệ thống chấm điểm tự động
- Tạo đề thi: Công cụ tạo đề thi tùy chỉnh theo nhu cầu
- AI Chat: Trợ lý AI hỗ trợ học tập 24/7
- Phòng luyện thi ảo: Mô phỏng môi trường thi thật (Sắp ra mắt)

12 MÔN HỌC HỖ TRỢ:
Toán, Vật Lý, Hóa, Ngữ Văn, Lịch Sử, Địa Lí, Sinh học, Tiếng Anh, GDCD, Kinh tế & Pháp luật, Công nghệ, Tin học

KHO TÀI LIỆU NỔI BẬT (70+ tài liệu MIỄN PHÍ):

📚 TOÁN: Bộ Đề Thi Thử TN THPT, 52 Bài Toán Tích Phân, 7 Ngày Chinh Phục Nguyên Hàm 9+ (Nguyễn Tiến Đạt), 40 Đề Thực Chiến (Đỗ Văn Đức), Công Thức Giải Nhanh (Hồ Thức Thuận), 200 Bài Toán Thực Tế, Khóa CASIO (5 chủ đề), Mẹo Trả Lời Ngắn & Đúng Sai 9+

⚛️ VẬT LÝ: 1000 Câu Trả Lời Ngắn 2026, 1500 Câu Trắc Nghiệm 2026, Đề HSG Vật Lý 12, Chuyên Đề Dạy Thêm 2026, Tổng Ôn 8+, Đề Thi Thử 2025

🧪 HÓA HỌC: 30 Đề Đúng Sai & Trả Lời Ngắn 2026 (Phạm Thắng), 40 Đề Thực Chiến (Phạm Văn Trọng), 60 Đề Minh Họa 2026, Đề Thi Thử 2025

🧬 SINH HỌC: Ôn Thi Toàn Diện (Cô Trà My - 2 tập), 40 Đề HSG Sinh 12, Đề Thi Thử 2025

📖 NGỮ VĂN: 100 Đề Minh Họa 2025, Toàn Bộ Kiến Thức Văn 12, Tài Liệu 9+ (3 tập), Đề Thi Thử 2025

🏛️ LỊCH SỬ: Sơ Đồ Tư Duy (Cô Sen), Tổng Ôn Moon, 4 Nguyên Tắc Đúng-Sai, Luyện Thi 2026, [V-ACT] Lịch Sử

🌍 ĐỊA LÝ: Tổng Ôn Moon (2 tập), 25 Đề Trọng Tâm 2025, 20 Đề 2026, 30 Đề Thực Chiến, Sơ Đồ Tư Duy, Full Đúng/Sai

🇬🇧 TIẾNG ANH: Từ Vựng Đọc Hiểu (Cô Phạm Liễu), Đề ĐGNL (Cô Trang Anh), [V-ACT] 5 Đề, Đề Thi Thử 2025

📚 ĐÁNH GIÁ NĂNG LỰC: ĐGNL ĐH Sư Phạm HN, 25 Đề ĐHQG HCM, 10 Đề VACT & HSA 2025, 1100 Câu Cày Xuyên Lễ, 20 Đề HCMUE

🎁 TẤT CẢ MIỄN PHÍ! Truy cập "Kho tài liệu" hoặc nhấn "🎁 QUÀ SIÊU HOT" để tải!

CÁC TRANG WEBSITE:
- Trang chủ: index.html
- Kho tài liệu: tai-lieu.html
- Luyện thi: luyen-thi.html
- Tạo đề thi: tao-de-thi.html
- Câu chuyện EduPass: cau-chuyen.html
- Hành trình EduPass: hanh-trinh-edupass.html
- Tài khoản: tai-khoan.html

LIÊN HỆ:
- Email: trcuong12112008@gmail.com
- Điện thoại: 0348 908 243 / 0876 422 788

NHIỆM VỤ CỦA BẠN:
- Trả lời câu hỏi về học tập, tài liệu, đề thi
- GỢI Ý TÀI LIỆU PHÙ HỢP khi học sinh hỏi về môn học
- Hướng dẫn sử dụng các tính năng của EduPass
- Tư vấn phương pháp học tập hiệu quả
- Giải đáp thắc mắc về môn học
- Cung cấp thông tin về đội ngũ, liên hệ khi được hỏi
- Luôn thân thiện, nhiệt tình và chuyên nghiệp

Hãy trả lời bằng tiếng Việt, ngắn gọn (tối đa 200 từ), dễ hiểu và hữu ích.\n\n`;

            // Add recent conversation history
            const recentHistory = this.conversationHistory.slice(-3);
            recentHistory.forEach(conv => {
                contextText += `Người dùng: ${conv.user}\nEduPass AI: ${conv.ai}\n\n`;
            });

            contextText += `Người dùng: ${userMessage}\nEduPass AI:`;

            console.log('Calling Gemini API...');
            
            const response = await fetch(`${this.endpoints.gemini}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: contextText
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500,
                        topP: 0.8,
                        topK: 40
                    }
                })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Gemini API Error Details:', errorData);
                throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log('Gemini Response:', data);
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid response format from Gemini');
            }
            
            return data.candidates[0].content.parts[0].text;
            
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw error;
        }
    }

    // OpenAI API
    async callOpenAIAPI(userMessage) {
        // Build context from conversation history
        const messages = [
            {
                role: 'system',
                content: `Bạn là EduPass AI, trợ lý học tập thông minh của nền tảng EduPass - một website học tập trực tuyến cho học sinh THPT Việt Nam.

THÔNG TIN VỀ EDUPASS:
- Tên đầy đủ: EduPass - Nền tảng học tập thông minh cho học sinh THPT
- Slogan: "Learn today. Pass tomorrow"
- Đơn vị thực hiện: Nhóm học sinh Trường THCS-THPT Hòa Bình
- Mục tiêu: Kiến tạo không gian học tập trực tuyến nơi học sinh có thể học thông minh hơn, ôn luyện hiệu quả hơn và chủ động hơn trên con đường chinh phục tri thức

ĐỘI NGŨ SÁNG LẬP:
Founder & Operator:
- Trần Nguyễn Chí Cường
- Email: trcuong12112008@gmail.com
- SĐT: 0348 908 243 / 0876 422 788
- Vai trò: Phát triển và vận hành toàn bộ hệ thống nền tảng EduPass, xây dựng kho tài liệu và ngân hàng đề luyện thi bám sát chương trình THPT

Thành viên đồng sáng lập:
1. Phạm Như Anh - Content & Learning Material Support
2. Lê Hoàng Gia Huy - Idea Development & Operation Support
3. Hồ Nguyễn Trúc Ngân - Design & Learning Experience Support
4. Nguyễn Minh Tiến - Learning Resource & Exam Bank Development
5. Nguyễn Gia Hòa - Content & Project Support
6. Lê Nhất Duy - Project & Community Support

HÀNH TRÌNH PHÁT TRIỂN:
1. Giai đoạn ý tưởng - Khởi nguồn từ nhu cầu học tập
2. Giai đoạn xây dựng - Những bước đi đầu tiên
3. Giai đoạn phát triển nội dung - Hoàn thiện giá trị học tập
4. Giai đoạn tích hợp công nghệ - Ứng dụng AI vào học tập
5. Giai đoạn mở rộng - Đồng hành cùng học sinh

TÍNH NĂNG CHÍNH:
- Kho tài liệu: Tài liệu chất lượng cao được biên soạn bởi giáo viên, bám sát chương trình THPT
- Luyện thi: Hàng ngàn đề thi từ cơ bản đến nâng cao với hệ thống chấm điểm tự động
- Tạo đề thi: Công cụ tạo đề thi tùy chỉnh theo nhu cầu
- AI Chat: Trợ lý AI hỗ trợ học tập 24/7
- Phòng luyện thi ảo: Mô phỏng môi trường thi thật (Sắp ra mắt)

12 MÔN HỌC HỖ TRỢ:
Toán, Vật Lý, Hóa, Ngữ Văn, Lịch Sử, Địa Lí, Sinh học, Tiếng Anh, GDCD, Kinh tế & Pháp luật, Công nghệ, Tin học

KHO TÀI LIỆU NỔI BẬT (70+ tài liệu MIỄN PHÍ):

📚 TOÁN: Bộ Đề Thi Thử TN THPT, 52 Bài Toán Tích Phân, 7 Ngày Chinh Phục Nguyên Hàm 9+ (Nguyễn Tiến Đạt), 40 Đề Thực Chiến (Đỗ Văn Đức), Công Thức Giải Nhanh (Hồ Thức Thuận), 200 Bài Toán Thực Tế, Khóa CASIO (5 chủ đề), Mẹo Trả Lời Ngắn & Đúng Sai 9+

⚛️ VẬT LÝ: 1000 Câu Trả Lời Ngắn 2026, 1500 Câu Trắc Nghiệm 2026, Đề HSG Vật Lý 12, Chuyên Đề Dạy Thêm 2026, Tổng Ôn 8+, Đề Thi Thử 2025

🧪 HÓA HỌC: 30 Đề Đúng Sai & Trả Lời Ngắn 2026 (Phạm Thắng), 40 Đề Thực Chiến (Phạm Văn Trọng), 60 Đề Minh Họa 2026, Đề Thi Thử 2025

🧬 SINH HỌC: Ôn Thi Toàn Diện (Cô Trà My - 2 tập), 40 Đề HSG Sinh 12, Đề Thi Thử 2025

📖 NGỮ VĂN: 100 Đề Minh Họa 2025, Toàn Bộ Kiến Thức Văn 12, Tài Liệu 9+ (3 tập), Đề Thi Thử 2025

🏛️ LỊCH SỬ: Sơ Đồ Tư Duy (Cô Sen), Tổng Ôn Moon, 4 Nguyên Tắc Đúng-Sai, Luyện Thi 2026, [V-ACT] Lịch Sử

🌍 ĐỊA LÝ: Tổng Ôn Moon (2 tập), 25 Đề Trọng Tâm 2025, 20 Đề 2026, 30 Đề Thực Chiến, Sơ Đồ Tư Duy, Full Đúng/Sai

🇬🇧 TIẾNG ANH: Từ Vựng Đọc Hiểu (Cô Phạm Liễu), Đề ĐGNL (Cô Trang Anh), [V-ACT] 5 Đề, Đề Thi Thử 2025

📚 ĐÁNH GIÁ NĂNG LỰC: ĐGNL ĐH Sư Phạm HN, 25 Đề ĐHQG HCM, 10 Đề VACT & HSA 2025, 1100 Câu Cày Xuyên Lễ, 20 Đề HCMUE

🎁 TẤT CẢ MIỄN PHÍ! Truy cập "Kho tài liệu" hoặc nhấn "🎁 QUÀ SIÊU HOT" để tải!

CÁC TRANG WEBSITE:
- Trang chủ: index.html
- Kho tài liệu: tai-lieu.html
- Luyện thi: luyen-thi.html
- Tạo đề thi: tao-de-thi.html
- Câu chuyện EduPass: cau-chuyen.html
- Hành trình EduPass: hanh-trinh-edupass.html
- Tài khoản: tai-khoan.html

LIÊN HỆ:
- Email: trcuong12112008@gmail.com
- Điện thoại: 0348 908 243 / 0876 422 788

NHIỆM VỤ CỦA BẠN:
- Trả lời câu hỏi về học tập, tài liệu, đề thi
- GỢI Ý TÀI LIỆU PHÙ HỢP khi học sinh hỏi về môn học
- Hướng dẫn sử dụng các tính năng của EduPass
- Tư vấn phương pháp học tập hiệu quả
- Giải đáp thắc mắc về môn học
- Cung cấp thông tin về đội ngũ, liên hệ khi được hỏi
- Luôn thân thiện, nhiệt tình và chuyên nghiệp

Hãy trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu và hữu ích.`
            }
        ];

        // Add recent conversation history (last 5 messages)
        const recentHistory = this.conversationHistory.slice(-5);
        recentHistory.forEach(conv => {
            messages.push({ role: 'user', content: conv.user });
            messages.push({ role: 'assistant', content: conv.ai });
        });

        // Add current message
        messages.push({ role: 'user', content: userMessage });

        const response = await fetch(this.endpoints.openai, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            throw new Error('OpenAI API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Save conversation history to localStorage for learning
    saveConversationHistory() {
        try {
            localStorage.setItem('edupass_ai_history', JSON.stringify(this.conversationHistory));
        } catch (e) {
            console.error('Failed to save conversation history:', e);
        }
    }

    // Load conversation history
    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('edupass_ai_history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load conversation history:', e);
        }
    }

    handleQuickAction(action) {
        switch (action) {
            case 'exam':
                this.addMessage('user', 'Tôi muốn tạo đề thi');
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.addMessage('ai', '📝 Tuyệt vời! Tạo đề thi tự luyện rất dễ:\n\n🎯 Các bước:\n1. Vào <a href="tao-de-thi.html" style="color: #667eea; font-weight: 600;">Tạo đề thi</a>\n2. Chọn môn học (12 môn)\n3. Nhập số câu hỏi (10-50 câu)\n4. Chọn độ khó (Dễ/Trung bình/Khó)\n5. Tạo thủ công hoặc dán từ AI\n\n✨ Tính năng:\n• Tự động tính điểm\n• Lưu lịch sử làm bài\n• Xem đáp án chi tiết\n• Phân tích điểm mạnh/yếu\n\n💡 Mẹo: Nên làm 20-30 câu/đề để hiệu quả!\n\nBạn muốn tạo đề môn gì?');
                }, 1000);
                break;
            case 'material':
                this.addMessage('user', 'Tìm tài liệu học tập');
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.addMessage('ai', '📚 Kho tài liệu EduPass siêu phong phú!\n\n🎯 Có gì:\n• Sách giáo khoa (SGK) đầy đủ\n• Sách bài tập (SBT) có lời giải\n• Đề thi các năm (2015-2024)\n• Tài liệu ôn thi THPT QG\n• Video bài giảng\n• Bài tập nâng cao\n\n🔍 Tìm kiếm theo:\n• Môn học (12 môn)\n• Lớp (6, 7, 8, 9, 10, 11, 12)\n• Loại (Miễn phí/Premium)\n\n👉 <a href="tai-lieu.html" style="color: #667eea; font-weight: 600;">Xem kho tài liệu ngay</a>\n\n💬 Bạn cần tài liệu môn gì, lớp mấy? Mình gợi ý cho!');
                }, 1000);
                break;
            case 'help':
                this.addMessage('user', 'Hướng dẫn sử dụng');
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.addMessage('ai', '❓ Hướng dẫn sử dụng EduPass:\n\n📝 <strong>Luyện thi:</strong>\n• Chọn môn → Làm đề thi trực tuyến\n• Xem điểm ngay lập tức\n• Phân tích đáp án chi tiết\n\n📚 <strong>Tài liệu:</strong>\n• Tìm kiếm theo môn/lớp\n• Tải về hoặc xem online\n• Đánh dấu tài liệu yêu thích\n\n✍️ <strong>Tạo đề:</strong>\n• Tự tạo đề thi riêng\n• Chia sẻ với bạn bè\n• Lưu vào thư viện cá nhân\n\n👤 <strong>Tài khoản:</strong>\n• Theo dõi tiến độ học tập\n• Xem thống kê điểm số\n• Quản lý tài liệu đã mua\n\n💡 <strong>Mẹo:</strong>\n• Học đều đặn mỗi ngày\n• Làm đề thi thử thường xuyên\n• Ôn lại kiến thức yếu\n\nBạn cần hướng dẫn chi tiết phần nào?');
                }, 1000);
                break;
        }
    }

    showNotification() {
        if (!this.isOpen) {
            document.getElementById('aiNotificationBadge').style.display = 'flex';
        }
    }
}

// Initialize AI Assistant when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.edupassAI = new EduPassAI();
    
    // Check if first visit
    const hasVisited = localStorage.getItem('edupass_has_visited');
    const lastVisit = localStorage.getItem('edupass_last_visit');
    const now = new Date().getTime();
    
    if (!hasVisited) {
        // First time visitor - show greeting bubble after 2 seconds
        setTimeout(() => {
            // Greeting bubble will be shown by showWelcomeMessage()
        }, 2000);
        localStorage.setItem('edupass_has_visited', 'true');
        localStorage.setItem('edupass_last_visit', now.toString());
    } else if (lastVisit) {
        // Returning visitor - check if it's been more than 1 day
        const daysSinceLastVisit = (now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);
        
        if (daysSinceLastVisit >= 1) {
            // Show greeting bubble if not visited for a day
            setTimeout(() => {
                if (!window.edupassAI.isOpen) {
                    // Greeting will be shown by showWelcomeMessage()
                }
            }, 3000);
        }
        
        localStorage.setItem('edupass_last_visit', now.toString());
    }
});

