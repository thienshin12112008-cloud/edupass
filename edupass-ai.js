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
            response = '📐 Tài liệu Toán trên EduPass:\n\n• <a href="https://drive.google.com/drive/folders/1IuzMQM-HspXdi6eV_Jcke_DFCGfyvwFP" target="_blank" style="color:#0288d1">Bộ Đề Thi Thử TN THPT Toán</a>\n• <a href="https://drive.google.com/file/d/1NaBgyHKTKqH8XnjZ5HsEQD_OW9sokez0/view" target="_blank" style="color:#0288d1">7 Ngày Chinh Phục Nguyên Hàm 9+</a>\n• <a href="https://drive.google.com/drive/folders/1i8deW-M3F2wvxpfSYbOIHAFPgRGm7flh" target="_blank" style="color:#0288d1">40 Đề Thực Chiến (Đỗ Văn Đức)</a>\n• <a href="https://drive.google.com/file/d/1DB-YXtxGzMFWjLorwkk5DKq8fVLOI0Tl/view" target="_blank" style="color:#0288d1">Công Thức Giải Nhanh Toán 12</a>\n• <a href="https://drive.google.com/drive/mobile/folders/1xrbgVBJ39rDN7-8532E99gdRR_5GAWB9" target="_blank" style="color:#0288d1">Mẹo Đúng Sai 9+ Toán</a>\n\n👉 <a href="tai-lieu.html" style="color:#00c853;font-weight:700">Xem tất cả tài liệu Toán →</a>';
        }
        
        // Vật Lý
        else if (message.includes('lý') || message.includes('vật lý') || message.includes('physics')) {
            response = '⚛️ Tài liệu Vật Lý trên EduPass:\n\n• <a href="https://drive.google.com/drive/folders/1eCBHFuu3WDV9SP7DJ5f2a1j88baLLJSf" target="_blank" style="color:#0288d1">1000 Câu Trả Lời Ngắn Vật Lí 2026</a>\n• <a href="https://drive.google.com/drive/folders/113Pd4a8dP-FTPbktuNcDwa7uiqhDzRFM" target="_blank" style="color:#0288d1">1500 Câu Trắc Nghiệm Vật Lí 2026</a>\n• <a href="https://drive.google.com/drive/folders/1EO4RW0oMEKbs6OXGZpniDnpGTl8NydoO" target="_blank" style="color:#0288d1">Đề HSG Vật Lý 12</a>\n• <a href="https://drive.google.com/open?id=1VLFd2EM6guqqhaTHSvU_b0JqNZdVM70L" target="_blank" style="color:#0288d1">Tổng Ôn Nắm Chắc 8+ Vật Lý</a>\n• <a href="https://drive.google.com/file/d/1pFGu2vV9NAKKEVXvo39HiwHdLM4xXNF_/view" target="_blank" style="color:#0288d1">Ebook Phong Toả Vật Lý (Vũ Ngọc Anh)</a>\n\n👉 <a href="tai-lieu.html" style="color:#00c853;font-weight:700">Xem tất cả tài liệu Vật Lý →</a>';
        }
        
        // Hóa học
        else if (message.includes('hóa') || message.includes('chemistry') || message.includes('phản ứng')) {
            response = '🧪 Tài liệu Hóa Học trên EduPass:\n\n• <a href="https://drive.google.com/drive/folders/1kBHkBjiXZfA8AG5glUhMc21Vp9HepQjr" target="_blank" style="color:#0288d1">40 Đề Thực Chiến Hóa (Phạm Văn Trọng)</a>\n• <a href="https://drive.google.com/drive/folders/12pi6K9724NWWIIpKTjtcM1AYzqZe7DaR" target="_blank" style="color:#0288d1">60 Đề Minh Họa 2026 Hóa Học</a>\n• <a href="https://drive.google.com/file/d/1kvfnUhhJCNjMACkKFKbSSfr_HikzsEO4/view" target="_blank" style="color:#0288d1">30 Đề Đúng Sai & Trả Lời Ngắn 2026</a>\n• <a href="https://drive.google.com/drive/folders/1mpKKF_omZSBhEeLO7e6FFvSZZ3CqlRjp" target="_blank" style="color:#0288d1">Tổng Hợp Đề Thi Thử 2025 Hóa</a>\n• <a href="https://drive.google.com/file/d/1zGSUDWGwrBE_YV2cnht23oOJuFK9DeGn/view" target="_blank" style="color:#0288d1">🎁 Quà Miễn Phí Hóa Học</a>\n\n👉 <a href="tai-lieu.html" style="color:#00c853;font-weight:700">Xem tất cả tài liệu Hóa →</a>';
        }
        
        // Ngữ Văn
        else if (message.includes('văn') || message.includes('ngữ văn') || message.includes('thơ') || 
                 message.includes('văn học') || message.includes('phân tích')) {
            response = '📖 Tài liệu Ngữ Văn trên EduPass:\n\n• <a href="https://drive.google.com/file/d/1J4-0b2-WLqMP85Vdt3Vo8XzL7vhY4-R3/view" target="_blank" style="color:#0288d1">100 Đề Minh Họa TN THPT 2025</a>\n• <a href="https://drive.google.com/file/d/1dIqGqyPff5qiVxyhjJ_cdB5YqTV9zhw-/view" target="_blank" style="color:#0288d1">Toàn Bộ Kiến Thức Ngữ Văn 12</a>\n• <a href="https://drive.google.com/file/d/1Ld6INdyDVy1pwqBNX_kyFY9XQibS4q7p/view" target="_blank" style="color:#0288d1">Tài Liệu 9+ Ngữ Văn (3 tập)</a>\n• <a href="https://drive.google.com/drive/folders/1Tu-19gIQMpG29wGgXFRXQ-79d9JbwBbv" target="_blank" style="color:#0288d1">Tổng Hợp Đề Thi Thử 2025 Văn</a>\n• <a href="https://drive.google.com/file/d/1RiT3muRQ3V13a0JQ3HEhGIEZv_o_7AuT/view" target="_blank" style="color:#0288d1">🎁 Quà Miễn Phí Ngữ Văn</a>\n\n👉 <a href="tai-lieu.html" style="color:#00c853;font-weight:700">Xem tất cả tài liệu Văn →</a>';
        }
        
        // Tiếng Anh
        else if (message.includes('anh') || message.includes('english') || message.includes('tiếng anh')) {
            response = '🇬🇧 Tài liệu Tiếng Anh trên EduPass:\n\n• <a href="https://drive.google.com/drive/folders/1RNRixqYjQZLLkKJsZLDX8rvFyBiFiOmk" target="_blank" style="color:#0288d1">Từ Vựng Đọc Hiểu Chuyên Sâu (Cô Phạm Liễu)</a>\n• <a href="https://drive.google.com/open?id=1ymtmhB2Mer2ODjHMxtuPpN0nYIEp97bw" target="_blank" style="color:#0288d1">Tài Liệu Cô Mai Phương 2026 (9 phần)</a>\n• <a href="https://drive.google.com/file/d/1Qpj_4GEbAll-mUAY62A4AqwR9dGrL1n6/view" target="_blank" style="color:#0288d1">Bộ Đề ĐGNL Tiếng Anh (Cô Trang Anh)</a>\n• <a href="https://drive.google.com/drive/folders/1PEp64xAvjdJ4c-T5WMmWWXoPgPlJRqKe" target="_blank" style="color:#0288d1">Tổng Hợp Đề Thi Thử 2025 Anh</a>\n• <a href="https://drive.google.com/drive/folders/1TFEeYqg4JO8YmBI_M3NhHJkOT1YXWMbz" target="_blank" style="color:#0288d1">🎁 Quà Miễn Phí Tiếng Anh</a>\n\n👉 <a href="tai-lieu.html" style="color:#00c853;font-weight:700">Xem tất cả tài liệu Tiếng Anh →</a>';
        }
        
        // Lịch Sử
        else if (message.includes('sử') || message.includes('lịch sử') || message.includes('history')) {
            response = '🏛️ Tài liệu Lịch Sử trên EduPass:\n\n• <a href="https://drive.google.com/file/d/1JBzrZCaVnITkAJJjHorUsWgY403-QTf9/view" target="_blank" style="color:#0288d1">Sơ Đồ Tư Duy Lịch Sử 12 (Cô Sen)</a>\n• <a href="https://drive.google.com/file/d/1F0zCru894tki6pJG_PBIKYFljdw4Irlu/view" target="_blank" style="color:#0288d1">Tổng Ôn Luyện Thi Lịch Sử Moon</a>\n• <a href="https://drive.google.com/file/d/1wme5GL-V5wzkcrMQn_FwW8gUs8X3bTub/view" target="_blank" style="color:#0288d1">4 Nguyên Tắc Đúng-Sai Lịch Sử</a>\n• <a href="https://drive.google.com/file/d/1Km-VnrISpEre-lbMzzOCLgl9Va-a7Pln/view" target="_blank" style="color:#0288d1">Luyện Thi THPT QG 2026 Lịch Sử</a>\n• <a href="https://drive.google.com/drive/folders/1JQn4EK7qEwIdM7Pu_PK1lG1Mwgjsu26x" target="_blank" style="color:#0288d1">Tổng Ôn Toàn Diện + Đáp Án</a>\n\n👉 <a href="tai-lieu.html" style="color:#00c853;font-weight:700">Xem tất cả tài liệu Lịch Sử →</a>';
        }
        
        // Địa Lý
        else if (message.includes('địa') || message.includes('địa lý') || message.includes('geography')) {
            response = '🌍 Tài liệu Địa Lý trên EduPass:\n\n• <a href="https://drive.google.com/drive/folders/1GmF3gUSIbcfwVbQZJ-qJZlONO5pp5Yzb" target="_blank" style="color:#0288d1">Tổng Ôn Địa Lí Moon Tập 1</a>\n• <a href="https://drive.google.com/drive/folders/1BDtzIf4RWjBYgBv_-dx9CiE0rcb_lVJ5" target="_blank" style="color:#0288d1">Tổng Ôn Địa Lý Moon Tập 2</a>\n• <a href="https://drive.google.com/drive/folders/1ofkkQnDB5KanY1yrjgTq2w47FbqAU1OG" target="_blank" style="color:#0288d1">25 Đề Trọng Tâm 2025 (Cô Mai Anh)</a>\n• <a href="https://drive.google.com/file/d/1_m9ZNBURi92cw07bwKl4ytJq88v0Fnvk/view" target="_blank" style="color:#0288d1">20 Đề Địa Lí Tuyển Chọn 2026</a>\n• <a href="https://drive.google.com/file/d/1md88-2lJzSPF1rGakkuJgi9on10spbDN/view" target="_blank" style="color:#0288d1">Full Đúng/Sai Địa Lý</a>\n\n👉 <a href="tai-lieu.html" style="color:#00c853;font-weight:700">Xem tất cả tài liệu Địa Lý →</a>';
        }
        
        // Sinh học
        else if (message.includes('sinh') || message.includes('sinh học') || message.includes('biology')) {
            response = '🧬 Tài liệu Sinh Học trên EduPass:\n\n• <a href="https://drive.google.com/file/d/1aBxBBHBDE7b_60SWyng3fd_uTRSqq6au/view" target="_blank" style="color:#0288d1">Ôn Thi Toàn Diện Sinh 12 Tập 1 (Cô Trà My)</a>\n• <a href="https://drive.google.com/file/d/1jOdtoBU_MNu5wKZnUFrBSx_qMvPW1SxK/view" target="_blank" style="color:#0288d1">Ôn Thi Toàn Diện Sinh 12 Tập 2 (Cô Trà My)</a>\n• <a href="https://drive.google.com/drive/folders/1ORse9h0ULrLp3GwNEqyJAL_Ra5cQJys-" target="_blank" style="color:#0288d1">40 Đề HSG Sinh 12 Chương Trình Mới</a>\n• <a href="https://drive.google.com/drive/folders/1TFDQDzlIvUazshI9BqoXOf-oK2I_3Zcq" target="_blank" style="color:#0288d1">Tổng Hợp Đề Thi Thử 2025 Sinh</a>\n• <a href="https://drive.google.com/drive/folders/162vljNxilJKqcOHXWI27rn9FxnqptvOf" target="_blank" style="color:#0288d1">🎁 Quà Miễn Phí Sinh Học</a>\n\n👉 <a href="tai-lieu.html" style="color:#00c853;font-weight:700">Xem tất cả tài liệu Sinh Học →</a>';
        }
        
        // Đề thi
        else if (message.includes('đề thi') || message.includes('tạo đề') || message.includes('luyện thi')) {
            response = '📝 Tạo đề thi tự luyện:\n\n🎯 Hướng dẫn:\n1. Vào <a href="tao-de-thi.html" style="color:#667eea">Tạo đề thi</a>\n2. Chọn môn học (12 môn)\n3. Nhập số câu hỏi (10-50 câu)\n4. Chọn độ khó (Dễ/TB/Khó)\n5. Tạo thủ công hoặc dán từ AI\n\n✨ Tính năng:\n• Tự động tính điểm\n• Lưu lịch sử làm bài\n• Xem đáp án chi tiết\n\nBạn muốn tạo đề môn gì?';
        }
        
        // Tài liệu
        else if (message.includes('tài liệu') || message.includes('tìm') || message.includes('download') || message.includes('tải')) {
            response = '📚 Kho tài liệu EduPass (83 tài liệu MIỄN PHÍ):\n\n📐 <a href="tai-lieu.html" style="color:#0288d1">Toán</a> | ⚛️ <a href="tai-lieu.html" style="color:#0288d1">Vật Lý</a> | 🧪 <a href="tai-lieu.html" style="color:#0288d1">Hóa</a> | 🧬 <a href="tai-lieu.html" style="color:#0288d1">Sinh</a>\n📖 <a href="tai-lieu.html" style="color:#0288d1">Văn</a> | 🇬🇧 <a href="tai-lieu.html" style="color:#0288d1">Anh</a> | 🏛️ <a href="tai-lieu.html" style="color:#0288d1">Sử</a> | 🌍 <a href="tai-lieu.html" style="color:#0288d1">Địa</a>\n\n👉 <a href="tai-lieu.html" style="color:#00c853;font-weight:700">Vào kho tài liệu →</a>\n\n💬 Bạn cần tài liệu môn gì? Mình gửi link trực tiếp!';
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
                response = `🤔 Mình hiểu bạn đang hỏi: "${userMessage}"\n\n💡 Mình có thể giúp bạn về:\n\n📚 Học tập:\n• Phương pháp học 12 môn\n• Tư vấn lộ trình ôn thi\n• Giải đáp kiến thức\n\n🎯 Tính năng:\n• Tạo đề thi tự luyện\n• Tìm tài liệu học tập\n• Xem điểm và thống kê\n\n📞 Liên hệ:\n• Email: edupasshotro@gmail.com\n• Zalo: 0348908243\n\nBạn muốn hỏi cụ thể về vấn đề gì?`;
            } else {
                response = `👋 Xin chào! Mình là EduPass AI.\n\n🎯 Bạn có thể hỏi mình:\n• "Cách học Toán hiệu quả?"\n• "Tìm tài liệu Lý lớp 12"\n• "Tạo đề thi Hóa học"\n• "Phương pháp ôn thi THPT"\n• "Giải thích [kiến thức]"\n\n💬 Hoặc chat tự do, mình sẽ cố gắng giúp bạn!\n\n📧 Liên hệ: edupasshotro@gmail.com`;
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
            let contextText = this.getSystemPrompt() + '\n\n';

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
                content: this.getSystemPrompt()
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

    getSystemPrompt() {
        return `Bạn là EduPass AI, trợ lý học tập thông minh của nền tảng EduPass - website học tập trực tuyến cho học sinh THPT Việt Nam.

THÔNG TIN EDUPASS:
- Slogan: "Learn today. Pass tomorrow"
- Đơn vị: Nhóm học sinh Trường THCS-THPT Hòa Bình
- Founder: Trần Nguyễn Chí Cường | Email: edupasshotro@gmail.com | SĐT: 0348 908 243 / 0876 422 788
- Co-Founders: Phạm Như Anh, Lê Hoàng Gia Huy, Lê Hoàng Khang, Nguyễn Gia Hòa, Nguyễn Minh Tiến, Lê Nhất Duy, Hồ Nguyễn Trúc Ngân

TRANG WEB: index.html | tai-lieu.html | luyen-thi.html | tao-de-thi.html | tai-khoan.html | cau-chuyen.html | hanh-trinh-edupass.html

KHO TÀI LIỆU ĐẦY ĐỦ VỚI LINK TẢI (83 tài liệu MIỄN PHÍ):

📐 TOÁN (link kho: tai-lieu.html?subject=toan):
1. Bộ Đề Thi Thử TN THPT Môn Toán → https://drive.google.com/drive/folders/1IuzMQM-HspXdi6eV_Jcke_DFCGfyvwFP
2. 52 Bài Toán Ứng Dụng Tích Phân → https://drive.google.com/file/d/1CvE0RHCtNfDdeGBpGcUU8pS9bTBtvhzE/view
3. 7 Ngày Chinh Phục Nguyên Hàm 9+ (Nguyễn Tiến Đạt) → https://drive.google.com/file/d/1NaBgyHKTKqH8XnjZ5HsEQD_OW9sokez0/view
4. 40 Đề Thực Chiến Toán (Đỗ Văn Đức) → https://drive.google.com/drive/folders/1i8deW-M3F2wvxpfSYbOIHAFPgRGm7flh
5. Công Thức Giải Nhanh Toán 12 (Hồ Thức Thuận) → https://drive.google.com/file/d/1DB-YXtxGzMFWjLorwkk5DKq8fVLOI0Tl/view
6. 200 Bài Toán Ứng Dụng Thực Tế → https://drive.google.com/file/d/1OtH8cK5Md4D8bVWRO_haF6YOu9rjPVKy/view
7. Phân Dạng Toàn Bộ Kiến Thức Toán 12 → https://drive.google.com/file/d/19JcDapD2aLA0h7IzmdkJcAUg__Ut94g0/view
8. Tổng Hợp Đề Thi Thử 2025 Toán → https://drive.google.com/drive/folders/1IuzMQM-HspXdi6eV_Jcke_DFCGfyvwFP
9. Tư Duy Giải Bài Toán Thực Tế (Nguyễn Tiến Đạt) → https://drive.google.com/file/d/1dFXh0Y9NsGPJ_DwhqjYs7qzG1r8aS1Uj/view
10. Khóa CASIO 5 chủ đề (Nguyễn Tiến Đạt) → https://drive.google.com/drive/mobile/folders/1bvM-Tv9oWvxJaKpbihNxTx8qXSWB9YCO
11. Mẹo Trả Lời Ngắn Toán → https://drive.google.com/drive/mobile/folders/1ibtAObXMNBteKb-dgN-1rBk3u7Yn496R
12. Mẹo Đúng Sai 9+ Toán → https://drive.google.com/drive/mobile/folders/1xrbgVBJ39rDN7-8532E99gdRR_5GAWB9
13. Bộ Sách Lộ Trình Step Toán 12 (Ngọc Huyền) → https://drive.google.com/file/d/1lwk1_QRY61P-DRHOa5pLN1iqeEoJXsMy/view
14. 25 Đề ĐGNL ĐHQG HCM (APT) → https://drive.google.com/file/d/1KjdPWdPakksbSAn6x0mgm-2GwuP6Lmyg/view
15. 20 Đề ĐGNL HSA Tập 1&2 → https://drive.google.com/file/d/1uCfHb423pxffnHr0XaMy3u8ngql_JScY/view
16. Bộ Đề Thực Chiến ĐGNL HSA (Empire Team) → https://drive.google.com/drive/folders/1vKShseABYnVEuooQJ_2zzg2H_suIlaI3
17. Trọn Bộ Đề V-ACT Qua Các Năm → https://drive.google.com/file/d/1qSy3Mnh0AvWIqF4Uceb13rvyEWUeBJf_/view
18. 10 Đề Chuẩn V-ACT 2026 (Empire Team) → https://drive.google.com/drive/folders/1-X9269L-8zqHdQThlkfM6lJ9uLO3mx5N
19. Bộ Sách Luyện Thi ĐGNL ĐH Sư Phạm HN (HSA Education) → https://drive.google.com/file/d/18FhwQr6T2_BNs_MMsQZRt8NFQJGGkbNa/view
20. Tài Liệu Ôn ĐGNL ĐHSP HN 7 Môn → https://drive.google.com/file/d/1gU-Nxg2Z6cF-rfM03KypK1hx0Y4fnDfG/view
21. Đề Minh Họa ĐHSP HN 2025 → https://drive.google.com/drive/folders/1sQ_si-TClrthWWUwXeryBSA79fRWHz9d
22. Tổng Hợp Tài Liệu HSA (Google Sheets) → https://docs.google.com/spreadsheets/d/1DIPYwjlI0xaQ6ER_f0RbySMky8ksP4gg/edit

⚛️ VẬT LÝ (link kho: tai-lieu.html?subject=ly):
1. 10 Đề Thi Thử Vật Lí P1 → https://drive.google.com/open?id=1kQVraUl2Gym3WT0q51krN-v_zs5f22QZ
2. Tổng Ôn Vật Lý 12 Trọn Bộ → https://drive.google.com/drive/mobile/folders/1sitzKVIptHQ5LrAwXgtflxM7IhNnYiZg
3. 1000 Câu Trả Lời Ngắn Vật Lí 12 2026 → https://drive.google.com/drive/folders/1eCBHFuu3WDV9SP7DJ5f2a1j88baLLJSf
4. 1500 Câu Trắc Nghiệm Vật Lí 12 2026 → https://drive.google.com/drive/folders/113Pd4a8dP-FTPbktuNcDwa7uiqhDzRFM
5. Đề HSG Vật Lý 12 2025-2026 → https://drive.google.com/drive/folders/1EO4RW0oMEKbs6OXGZpniDnpGTl8NydoO
6. Chuyên Đề Dạy Thêm Vật Lí 12 2026 → https://drive.google.com/drive/folders/1fLA75nEwUVRTimoEhIHuwmqfCBs5fvY1
7. Ngân Hàng Câu Hỏi Vật Lí 12 Theo Chuyên Đề → https://drive.google.com/drive/folders/1w3YBDewErHF_uVqGYS-husgsffDz1gsO
8. Tổng Ôn Nắm Chắc 8+ Vật Lý 12 → https://drive.google.com/open?id=1VLFd2EM6guqqhaTHSvU_b0JqNZdVM70L
9. Tổng Hợp Đề Thi Thử 2025 Vật Lý → https://drive.google.com/drive/folders/1R_EQTRNiloyNuPZ4y_zO-qaY4jcdUQwN
10. Ebook Phong Toả Vật Lý 12 (Vũ Ngọc Anh) → https://drive.google.com/file/d/1pFGu2vV9NAKKEVXvo39HiwHdLM4xXNF_/view
11. Combo Sách Lập Trình Tư Duy Vật Lý 12 → https://tailieuonthi.edu.vn/lap-trinh-tu-duy-vat-ly-nhiet-pdf-thay-vu-ngoc-anh/

🧪 HÓA HỌC (link kho: tai-lieu.html?subject=hoa):
1. 10 Đề Thi Thử Hóa P1 → https://drive.google.com/open?id=1Z8sP9xG9I0NwYa3kYn2wzJHG5Oyk49xn
2. 40 Đề Thực Chiến Hóa (Phạm Văn Trọng) → https://drive.google.com/drive/folders/1kBHkBjiXZfA8AG5glUhMc21Vp9HepQjr
3. 60 Đề Minh Họa 2026 Hóa Học → https://drive.google.com/drive/folders/12pi6K9724NWWIIpKTjtcM1AYzqZe7DaR
4. Tổng Hợp Đề Thi Thử 2025 Hóa → https://drive.google.com/drive/folders/1mpKKF_omZSBhEeLO7e6FFvSZZ3CqlRjp
5. 30 Đề Đúng Sai & Trả Lời Ngắn Hóa 2026 (Phạm Thắng) → https://drive.google.com/file/d/1kvfnUhhJCNjMACkKFKbSSfr_HikzsEO4/view
6. Tài Liệu Tổng Hợp Hóa Học → https://drive.google.com/file/d/1p0kzeVWJznDfkMdlWTf9zdIWGA3OkOHG/view

🧬 SINH HỌC (link kho: tai-lieu.html?subject=sinh):
1. 10 Đề Thi Thử Sinh P1 → https://drive.google.com/open?id=1qcdTJtq2uRavHJ9SYeb7YCUSS2vQSOxt
2. 40 Đề HSG Sinh 12 Chương Trình Mới → https://drive.google.com/drive/folders/1ORse9h0ULrLp3GwNEqyJAL_Ra5cQJys-
3. Tổng Hợp Đề Thi Thử 2025 Sinh → https://drive.google.com/drive/folders/1TFDQDzlIvUazshI9BqoXOf-oK2I_3Zcq
4. Ôn Thi Toàn Diện Sinh 12 Tập 1 (Cô Trà My) → https://drive.google.com/file/d/1aBxBBHBDE7b_60SWyng3fd_uTRSqq6au/view
5. Ôn Thi Toàn Diện Sinh 12 Tập 2 (Cô Trà My) → https://drive.google.com/file/d/1jOdtoBU_MNu5wKZnUFrBSx_qMvPW1SxK/view
6. Tài Liệu Tổng Hợp Sinh Học → https://drive.google.com/file/d/1KtOCZpb5tKUNwn5q-zhT0-FFzKA39q60/view

📖 NGỮ VĂN (link kho: tai-lieu.html?subject=van):
1. 100 Đề Minh Họa TN THPT 2025 Ngữ Văn → https://drive.google.com/file/d/1J4-0b2-WLqMP85Vdt3Vo8XzL7vhY4-R3/view (mã: EdupassVan50demh)
2. Toàn Bộ Kiến Thức Ngữ Văn 12 → https://drive.google.com/file/d/1dIqGqyPff5qiVxyhjJ_cdB5YqTV9zhw-/view
3. Tài Liệu 9+ Ngữ Văn (3 tập) → https://drive.google.com/file/d/1Ld6INdyDVy1pwqBNX_kyFY9XQibS4q7p/view
4. Tổng Hợp Đề Thi Thử 2025 Ngữ Văn → https://drive.google.com/drive/folders/1Tu-19gIQMpG29wGgXFRXQ-79d9JbwBbv

🏛️ LỊCH SỬ (link kho: tai-lieu.html?subject=su):
1. Sơ Đồ Tư Duy Lịch Sử 12 (Cô Sen) → https://drive.google.com/file/d/1JBzrZCaVnITkAJJjHorUsWgY403-QTf9/view
2. Tổng Ôn Luyện Thi Lịch Sử Moon → https://drive.google.com/file/d/1F0zCru894tki6pJG_PBIKYFljdw4Irlu/view
3. 4 Nguyên Tắc Đúng-Sai Lịch Sử → https://drive.google.com/file/d/1wme5GL-V5wzkcrMQn_FwW8gUs8X3bTub/view
4. Luyện Thi THPT QG 2026 Lịch Sử → https://drive.google.com/file/d/1Km-VnrISpEre-lbMzzOCLgl9Va-a7Pln/view
5. [V-ACT] Lịch Sử (Cô Sen) → https://drive.google.com/drive/folders/15jOC3mEjEJwJ6UBDJAOmzzrLI8nWto-x
6. Tổng Ôn Toàn Diện Lịch Sử + Đáp Án → https://drive.google.com/drive/folders/1JQn4EK7qEwIdM7Pu_PK1lG1Mwgjsu26x
7. Tổng Hợp Đề Thi Thử 2025 Lịch Sử → https://drive.google.com/drive/folders/13QBF8e8d60jwoXNSRkRvDyKDHDf3lGP-
8. Sơ Đồ Tư Duy Lịch Sử (2 bộ) → https://drive.google.com/file/d/1zeOfz_zLJCp3rOQh-FcwnP4YpjaAIhm2/view

🌍 ĐỊA LÝ (link kho: tai-lieu.html?subject=dia):
1. Tổng Ôn Địa Lí Moon Tập 1 → https://drive.google.com/drive/folders/1GmF3gUSIbcfwVbQZJ-qJZlONO5pp5Yzb
2. Tổng Ôn Địa Lý Moon Tập 2 → https://drive.google.com/drive/folders/1BDtzIf4RWjBYgBv_-dx9CiE0rcb_lVJ5
3. 25 Đề Địa Lí Trọng Tâm 2025 (Cô Mai Anh) → https://drive.google.com/drive/folders/1ofkkQnDB5KanY1yrjgTq2w47FbqAU1OG
4. 20 Đề Địa Lí Tuyển Chọn 2026 → https://drive.google.com/file/d/1_m9ZNBURi92cw07bwKl4ytJq88v0Fnvk/view
5. 30 Đề Thực Chiến Địa THPTQG (Thầy Tài) → https://drive.google.com/drive/folders/1XgEwH3f3kQnvshSqit9i7vWpSDzvuEDy
6. Sơ Đồ Tư Duy Địa Lý 12 → https://drive.google.com/file/d/1yMSFVSiQfHfy0dOxNiQTKivTcqPdEhfP/view
7. Full Đúng/Sai Địa Lý → https://drive.google.com/file/d/1md88-2lJzSPF1rGakkuJgi9on10spbDN/view
8. Combo Tổng Ôn Địa Lý → https://drive.google.com/drive/folders/1iji2quXHvuSphA7ZBq2VBzt6o8EqLfht
9. Tổng Hợp Đề Thi Thử 2025 Địa Lý → https://drive.google.com/drive/folders/12negaQ-i2NFw9pjrejTK2kKty71TJjqG

🇬🇧 TIẾNG ANH (link kho: tai-lieu.html?subject=anh):
1. Từ Vựng Đọc Hiểu Chuyên Sâu (Cô Phạm Liễu) → https://drive.google.com/drive/folders/1RNRixqYjQZLLkKJsZLDX8rvFyBiFiOmk
2. Bộ Đề ĐGNL Tiếng Anh (Cô Trang Anh) → https://drive.google.com/file/d/1Qpj_4GEbAll-mUAY62A4AqwR9dGrL1n6/view
3. [V-ACT] 5 Đề Tiếng Anh (Empire Team) → https://drive.google.com/file/d/10mLDuxOC9cYEcvrc-wN2pYKiJEGbEqDW/view
4. Tổng Hợp Đề Thi Thử 2025 Tiếng Anh → https://drive.google.com/drive/folders/1PEp64xAvjdJ4c-T5WMmWWXoPgPlJRqKe
5. Tổng Hợp Tài Liệu Tiếng Anh Cô Mai Phương 2026 (9 phần) → https://drive.google.com/open?id=1ymtmhB2Mer2ODjHMxtuPpN0nYIEp97bw
6. Tài Liệu Tổng Hợp Tiếng Anh → https://drive.google.com/file/d/1BJbUdejhTGlL48CTuRbl74OgSc1nyYqQ/view

🎁 QUÀ MIỄN PHÍ THEO MÔN (Google Drive):
- Ngữ Văn: https://drive.google.com/file/d/1RiT3muRQ3V13a0JQ3HEhGIEZv_o_7AuT/view
- Toán: https://drive.google.com/drive/folders/1-JRpMi9ghHs-2sGJT9xsPHVSup4iPP7K
- Tiếng Anh: https://drive.google.com/drive/folders/1TFEeYqg4JO8YmBI_M3NhHJkOT1YXWMbz
- Vật Lý: https://drive.google.com/file/d/1mGFAkLXfHxT2xXyrCfdkYgnZHmtHA-m0/view
- Hóa Học: https://drive.google.com/file/d/1zGSUDWGwrBE_YV2cnht23oOJuFK9DeGn/view
- Sinh Học: https://drive.google.com/drive/folders/162vljNxilJKqcOHXWI27rn9FxnqptvOf
- Lịch Sử: https://drive.google.com/file/d/1F0zCru894tki6pJG_PBIKYFljdw4Irlu/view
- Địa Lý: https://drive.google.com/drive/folders/1iji2quXHvuSphA7ZBq2VBzt6o8EqLfht

NHIỆM VỤ QUAN TRỌNG:
- Khi học sinh hỏi tài liệu môn nào → LUÔN đưa ra danh sách tài liệu kèm LINK TRỰC TIẾP của môn đó
- Khi hỏi chung → gợi ý vào tai-lieu.html và nhấn chip môn học tương ứng
- Trả lời ngắn gọn, thân thiện, bằng tiếng Việt
- Ưu tiên đưa link tải trực tiếp thay vì chỉ mô tả`;
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

