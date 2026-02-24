// Dữ liệu mẫu
const materials = [
    {
        id: 1,
        title: "Đề thi Toán học lớp 12",
        description: "Bộ đề thi Toán học THPT Quốc gia",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "https://via.placeholder.com/300x200?text=Toán+học"
    },
    {
        id: 2,
        title: "Tài liệu Vật lý nâng cao",
        description: "Tổng hợp kiến thức Vật lý 11",
        subject: "ly",
        grade: "11",
        price: 50000,
        image: "https://via.placeholder.com/300x200?text=Vật+lý"
    },
    {
        id: 3,
        title: "Ngữ pháp Tiếng Anh cơ bản",
        description: "Hệ thống ngữ pháp từ A-Z",
        subject: "anh",
        grade: "10",
        price: 0,
        image: "https://via.placeholder.com/300x200?text=Tiếng+Anh"
    },
    {
        id: 4,
        title: "Hóa học hữu cơ",
        description: "Chuyên đề Hóa học hữu cơ lớp 12",
        subject: "hoa",
        grade: "12",
        price: 75000,
        image: "https://via.placeholder.com/300x200?text=Hóa+học"
    }
];

const subjects = [
    { id: "toan", name: "Toán học" },
    { id: "ly", name: "Vật lý" },
    { id: "hoa", name: "Hóa học" },
    { id: "anh", name: "Tiếng Anh" },
    { id: "van", name: "Ngữ văn" },
    { id: "sinh", name: "Sinh học" }
];

const exams = {
    toan: [
        { id: 1, title: "Đề thi thử THPT QG 2024 - Lần 1", questions: 40, time: 90 },
        { id: 2, title: "Đề thi học kỳ I - Lớp 12", questions: 30, time: 60 }
    ],
    ly: [
        { id: 3, title: "Đề thi thử THPT QG 2024 - Vật lý", questions: 40, time: 50 }
    ],
    hoa: [
        { id: 4, title: "Đề thi học kỳ II - Hóa 11", questions: 30, time: 45 }
    ]
};

const sampleQuestions = [
    {
        question: "Phương trình x² - 5x + 6 = 0 có nghiệm là:",
        options: ["x = 2 hoặc x = 3", "x = 1 hoặc x = 6", "x = -2 hoặc x = -3", "Vô nghiệm"],
        correct: 0
    },
    {
        question: "Đạo hàm của hàm số y = x³ là:",
        options: ["y' = x²", "y' = 3x²", "y' = 3x", "y' = x³"],
        correct: 1
    },
    {
        question: "Giá trị của sin(90°) là:",
        options: ["0", "1", "-1", "0.5"],
        correct: 1
    }
];

let currentSubject = null;
let currentExam = null;
let startTime = null;
let timerInterval = null;

// Trang chủ - Hiển thị tài liệu mới nhất
if (document.getElementById('latestMaterials')) {
    displayMaterials(materials.slice(0, 3), 'latestMaterials');
}

// Trang tài liệu
if (document.getElementById('materialsGrid')) {
    displayMaterials(materials, 'materialsGrid');
    
    // Tìm kiếm và lọc
    document.getElementById('searchInput').addEventListener('input', filterMaterials);
    document.getElementById('subjectFilter').addEventListener('change', filterMaterials);
    document.getElementById('gradeFilter').addEventListener('change', filterMaterials);
    document.getElementById('priceFilter').addEventListener('change', filterMaterials);
}

function displayMaterials(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(material => `
        <div class="material-card">
            <img src="${material.image}" alt="${material.title}">
            <div class="material-card-content">
                <h3>${material.title}</h3>
                <p>${material.description}</p>
                <div class="material-meta">
                    <span>📚 ${getSubjectName(material.subject)}</span>
                    <span>🎓 Lớp ${material.grade}</span>
                </div>
                <div class="material-price">
                    ${material.price === 0 ? 'Miễn phí' : material.price.toLocaleString('vi-VN') + 'đ'}
                </div>
                <div class="material-actions">
                    <button class="btn-secondary" onclick="previewMaterial(${material.id})">Xem trước</button>
                    <button class="btn-primary" onclick="downloadMaterial(${material.id})">
                        ${material.price === 0 ? 'Tải về' : 'Mua ngay'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterMaterials() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const subject = document.getElementById('subjectFilter').value;
    const grade = document.getElementById('gradeFilter').value;
    const price = document.getElementById('priceFilter').value;
    
    const filtered = materials.filter(m => {
        const matchSearch = m.title.toLowerCase().includes(search) || m.description.toLowerCase().includes(search);
        const matchSubject = !subject || m.subject === subject;
        const matchGrade = !grade || m.grade === grade;
        const matchPrice = !price || (price === 'free' && m.price === 0) || (price === 'paid' && m.price > 0);
        
        return matchSearch && matchSubject && matchGrade && matchPrice;
    });
    
    displayMaterials(filtered, 'materialsGrid');
}

function getSubjectName(id) {
    const subject = subjects.find(s => s.id === id);
    return subject ? subject.name : id;
}

function previewMaterial(id) {
    alert('Chức năng xem trước tài liệu #' + id);
}

function downloadMaterial(id) {
    const material = materials.find(m => m.id === id);
    if (material.price === 0) {
        alert('Đang tải tài liệu: ' + material.title);
    } else {
        showPaymentModal(material);
    }
}

function showPaymentModal(material) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-content">
            <span class="close-modal" onclick="closePaymentModal()">&times;</span>
            <h2>Thanh toán tài liệu</h2>
            <div class="payment-info">
                <h3>${material.title}</h3>
                <p class="payment-price">Giá: ${material.price.toLocaleString('vi-VN')}đ</p>
            </div>
            
            <div class="payment-qr">
                <h3>Quét mã QR để thanh toán</h3>
                <img src="https://img.vietqr.io/image/MB-0123456789-compact2.png?amount=${material.price}&addInfo=EDUPASS${material.id}" 
                     alt="QR Code" class="qr-code">
                <p class="bank-info">
                    <strong>Ngân hàng:</strong> MB Bank<br>
                    <strong>Số tài khoản:</strong> 0123456789<br>
                    <strong>Chủ tài khoản:</strong> NGUYEN VAN A<br>
                    <strong>Nội dung:</strong> EDUPASS${material.id}
                </p>
            </div>
            
            <div class="payment-instructions">
                <h3>Hướng dẫn thanh toán:</h3>
                <ol>
                    <li>Quét mã QR hoặc chuyển khoản theo thông tin trên</li>
                    <li>Chụp màn hình xác nhận chuyển tiền thành công</li>
                    <li>Nhắn tin Zalo kèm ảnh chụp màn hình đến: <strong class="zalo-link">0987654321</strong></li>
                    <li>Nhận mã tải tài liệu từ admin (trong vòng 5-10 phút)</li>
                </ol>
                <a href="https://zalo.me/0987654321" target="_blank" class="btn-primary btn-zalo">
                    💬 Nhắn tin Zalo ngay
                </a>
            </div>
            
            <div class="payment-code-section">
                <h3>Đã có mã tải tài liệu?</h3>
                <input type="text" id="downloadCode" placeholder="Nhập mã tải tài liệu">
                <button class="btn-primary" onclick="verifyDownloadCode(${material.id})">Xác nhận & Tải về</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function closePaymentModal() {
    const modal = document.querySelector('.payment-modal');
    if (modal) {
        modal.remove();
    }
}

function verifyDownloadCode(materialId) {
    const code = document.getElementById('downloadCode').value.trim();
    
    if (!code) {
        alert('Vui lòng nhập mã tải tài liệu!');
        return;
    }
    
    // Demo: Kiểm tra mã (trong thực tế sẽ gọi API)
    if (code.length >= 6) {
        alert('Mã hợp lệ! Đang tải tài liệu...');
        closePaymentModal();
        // Thực hiện tải tài liệu
        setTimeout(() => {
            alert('Tải tài liệu thành công!');
        }, 1000);
    } else {
        alert('Mã không hợp lệ! Vui lòng kiểm tra lại hoặc liên hệ Zalo.');
    }
}

// Đóng modal khi click bên ngoài
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('payment-modal')) {
        closePaymentModal();
    }
});

// Trang luyện thi
if (document.querySelector('.exam-section')) {
    displaySubjects();
}

function displaySubjects() {
    const container = document.querySelector('.subjects-grid');
    if (!container) return;
    
    container.innerHTML = subjects.map(subject => `
        <div class="subject-card" onclick="selectSubject('${subject.id}')">
            ${subject.name}
        </div>
    `).join('');
}

function selectSubject(subjectId) {
    currentSubject = subjectId;
    document.getElementById('subjectList').style.display = 'none';
    document.getElementById('examList').style.display = 'block';
    
    const subjectExams = exams[subjectId] || [];
    const container = document.querySelector('.exams-grid');
    
    container.innerHTML = subjectExams.map(exam => `
        <div class="exam-card" onclick="startExam(${exam.id})">
            <h3>${exam.title}</h3>
            <p>Số câu: ${exam.questions} | Thời gian: ${exam.time} phút</p>
        </div>
    `).join('');
}

function backToSubjects() {
    document.getElementById('examList').style.display = 'none';
    document.getElementById('subjectList').style.display = 'block';
    currentSubject = null;
}

function startExam(examId) {
    currentExam = examId;
    document.getElementById('examList').style.display = 'none';
    document.getElementById('examTest').style.display = 'block';
    
    document.getElementById('examTitle').textContent = 'Đề thi số ' + examId;
    
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = sampleQuestions.map((q, index) => `
        <div class="question">
            <h3>Câu ${index + 1}: ${q.question}</h3>
            <div class="options">
                ${q.options.map((opt, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${opt}
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    startTime = Date.now();
    startTimer();
    
    document.getElementById('examForm').onsubmit = submitExam;
}

function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('timer').textContent = 
            `Thời gian: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function submitExam(e) {
    e.preventDefault();
    clearInterval(timerInterval);
    
    let correct = 0;
    const answers = [];
    
    sampleQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const userAnswer = selected ? parseInt(selected.value) : -1;
        const isCorrect = userAnswer === q.correct;
        
        if (isCorrect) correct++;
        
        answers.push({
            question: q.question,
            userAnswer: userAnswer >= 0 ? q.options[userAnswer] : 'Không trả lời',
            correctAnswer: q.options[q.correct],
            isCorrect
        });
    });
    
    showResult(correct, answers);
}

function showResult(correct, answers) {
    document.getElementById('examTest').style.display = 'none';
    document.getElementById('examResult').style.display = 'block';
    
    const total = sampleQuestions.length;
    const score = (correct / total * 10).toFixed(2);
    
    document.getElementById('score').textContent = `${score} điểm`;
    document.getElementById('resultDetails').textContent = 
        `Đúng ${correct}/${total} câu (${(correct/total*100).toFixed(0)}%)`;
    
    document.getElementById('answers').innerHTML = answers.map((a, i) => `
        <div class="answer-review ${a.isCorrect ? 'correct' : 'incorrect'}">
            <h4>Câu ${i + 1}: ${a.question}</h4>
            <p><strong>Bạn chọn:</strong> ${a.userAnswer}</p>
            <p><strong>Đáp án đúng:</strong> ${a.correctAnswer}</p>
        </div>
    `).join('');
}

function backToExams() {
    document.getElementById('examResult').style.display = 'none';
    document.getElementById('examTest').style.display = 'none';
    selectSubject(currentSubject);
}

// Form đăng ký
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').onsubmit = function(e) {
        e.preventDefault();
        
        // Clear previous errors
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('confirmPasswordError').textContent = '';
        document.getElementById('errorMessage').style.display = 'none';
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        let hasError = false;
        
        if (!fullname || fullname.length < 3) {
            document.getElementById('errorMessage').textContent = '❌ Họ tên phải có ít nhất 3 ký tự';
            document.getElementById('errorMessage').style.display = 'block';
            hasError = true;
        }
        
        if (!email || !email.includes('@')) {
            document.getElementById('emailError').textContent = 'Email không hợp lệ';
            hasError = true;
        }
        
        if (!password || password.length < 6) {
            document.getElementById('passwordError').textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
            hasError = true;
        }
        
        if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = '❌ Mật khẩu xác nhận không khớp!';
            hasError = true;
        }
        
        if (hasError) return;
        
        // Show loading state
        const registerBtn = document.getElementById('registerBtn');
        registerBtn.disabled = true;
        registerBtn.querySelector('.btn-text').style.display = 'none';
        registerBtn.querySelector('.btn-loader').style.display = 'flex';
        
        // Simulate API call
        setTimeout(() => {
            // Lưu tài khoản
            localStorage.setItem('user', JSON.stringify({ fullname, email, password }));
            alert('✅ Đăng ký thành công!');
            window.location.href = 'dang-nhap.html';
        }, 1500);
    };
}

// Toggle password for register form
function togglePasswordRegister(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Account Page Functions
if (window.location.pathname.includes('tai-khoan.html')) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn');
    if (!isLoggedIn) {
        window.location.href = 'dang-nhap.html';
    }
    
    loadAccountData();
}

function loadAccountData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
    
    // Set default data if not exists
    if (!accountData.balance) {
        accountData.balance = 0;
        accountData.birthday = '';
        accountData.phone = '';
        accountData.joinDate = new Date().toLocaleDateString('vi-VN');
        accountData.purchasedMaterials = [];
        accountData.examHistory = [];
        accountData.rechargeHistory = [];
        accountData.avatar = 'assets/logo2.png';
        localStorage.setItem('accountData', JSON.stringify(accountData));
    }
    
    // Always display fixed avatar (dolphin logo)
    document.getElementById('avatarImg').src = 'assets/logo2.png';
    
    // Display user info
    document.getElementById('userName').textContent = user.fullname || 'Người dùng';
    document.getElementById('userEmail').textContent = user.email || '';
    document.getElementById('displayName').textContent = user.fullname || '-';
    document.getElementById('displayEmail').textContent = user.email || '-';
    document.getElementById('displayBirthday').textContent = accountData.birthday || 'Chưa cập nhật';
    document.getElementById('displayPhone').textContent = accountData.phone || 'Chưa cập nhật';
    document.getElementById('displayJoinDate').textContent = accountData.joinDate || '-';
    
    // Display balance
    document.getElementById('accountBalance').textContent = accountData.balance.toLocaleString('vi-VN') + 'đ';
    
    // Display stats
    document.getElementById('totalExams').textContent = accountData.examHistory.length;
    document.getElementById('totalMaterials').textContent = accountData.purchasedMaterials.length;
    
    const avgScore = accountData.examHistory.length > 0 
        ? (accountData.examHistory.reduce((sum, exam) => sum + exam.score, 0) / accountData.examHistory.length).toFixed(1)
        : 0;
    document.getElementById('avgScore').textContent = avgScore;
    
    // Display purchased materials
    displayPurchasedMaterials(accountData.purchasedMaterials);
    
    // Display exam history
    displayExamHistory(accountData.examHistory);
    
    // Display recharge history
    displayRechargeHistory(accountData.rechargeHistory);
}

function displayPurchasedMaterials(materials) {
    const container = document.getElementById('purchasedMaterials');
    if (materials.length === 0) {
        container.innerHTML = '<p class="empty-message">Bạn chưa mua tài liệu nào</p>';
        return;
    }
    
    container.innerHTML = materials.map(item => `
        <div class="material-item">
            <div class="item-header">
                <span class="item-title">${item.title}</span>
                <span class="item-price">${item.price.toLocaleString('vi-VN')}đ</span>
            </div>
            <div class="item-info">
                Ngày mua: ${item.date} | Môn: ${item.subject}
            </div>
        </div>
    `).join('');
}

function displayExamHistory(exams) {
    const container = document.getElementById('examHistory');
    if (exams.length === 0) {
        container.innerHTML = '<p class="empty-message">Bạn chưa làm bài thi nào</p>';
        return;
    }
    
    container.innerHTML = exams.map(item => `
        <div class="exam-item">
            <div class="item-header">
                <span class="item-title">${item.title}</span>
                <span class="item-score">${item.score} điểm</span>
            </div>
            <div class="item-info">
                Ngày làm: ${item.date} | Thời gian: ${item.time} phút
            </div>
        </div>
    `).join('');
}

function displayRechargeHistory(history) {
    const container = document.getElementById('rechargeHistory');
    if (history.length === 0) {
        container.innerHTML = '<p class="empty-message">Chưa có giao dịch nạp tiền</p>';
        return;
    }
    
    container.innerHTML = history.map(item => `
        <div class="recharge-item">
            <div class="item-header">
                <span class="item-title">Nạp tiền vào tài khoản</span>
                <span class="item-price">+${item.amount.toLocaleString('vi-VN')}đ</span>
            </div>
            <div class="item-info">
                ${item.date} | ${item.method}
            </div>
        </div>
    `).join('');
}

function editProfile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
    
    document.getElementById('editName').value = user.fullname || '';
    document.getElementById('editBirthday').value = accountData.birthday || '';
    document.getElementById('editPhone').value = accountData.phone || '';
    
    document.getElementById('editModal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

document.getElementById('editForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
    
    user.fullname = document.getElementById('editName').value;
    accountData.birthday = document.getElementById('editBirthday').value;
    accountData.phone = document.getElementById('editPhone').value;
    
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accountData', JSON.stringify(accountData));
    
    closeEditModal();
    loadAccountData();
    alert('✅ Cập nhật thông tin thành công!');
});

function showRechargeModal() {
    document.getElementById('rechargeModal').style.display = 'flex';
}

function closeRechargeModal() {
    document.getElementById('rechargeModal').style.display = 'none';
}

function recharge(amount) {
    const accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
    accountData.balance = (accountData.balance || 0) + amount;
    
    accountData.rechargeHistory = accountData.rechargeHistory || [];
    accountData.rechargeHistory.unshift({
        amount: amount,
        date: new Date().toLocaleString('vi-VN'),
        method: 'Chuyển khoản ngân hàng'
    });
    
    localStorage.setItem('accountData', JSON.stringify(accountData));
    closeRechargeModal();
    loadAccountData();
    alert(`✅ Nạp ${amount.toLocaleString('vi-VN')}đ thành công!`);
}

function rechargeCustom() {
    const amount = parseInt(document.getElementById('customAmount').value);
    if (!amount || amount < 10000) {
        alert('Số tiền nạp tối thiểu là 10,000đ');
        return;
    }
    recharge(amount);
}

function logout() {
    localStorage.removeItem('loggedIn');
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Form đăng nhập
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').onsubmit = function(e) {
        e.preventDefault();
        
        // Clear previous errors
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('errorMessage').style.display = 'none';
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validation
        let hasError = false;
        
        if (!email || !email.includes('@')) {
            document.getElementById('emailError').textContent = 'Email không hợp lệ';
            hasError = true;
        }
        
        if (!password || password.length < 6) {
            document.getElementById('passwordError').textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
            hasError = true;
        }
        
        if (hasError) return;
        
        // Show loading state
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.disabled = true;
        loginBtn.querySelector('.btn-text').style.display = 'none';
        loginBtn.querySelector('.btn-loader').style.display = 'flex';
        
        // Simulate API call
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            
            if (user.email === email && user.password === password) {
                if (remember) {
                    localStorage.setItem('loggedIn', 'true');
                } else {
                    sessionStorage.setItem('loggedIn', 'true');
                }
                alert('Đăng nhập thành công!');
                window.location.href = 'tai-khoan.html';
            } else {
                // Show error
                const errorMsg = document.getElementById('errorMessage');
                errorMsg.textContent = '❌ Email hoặc mật khẩu không đúng!';
                errorMsg.style.display = 'block';
                
                // Reset button
                loginBtn.disabled = false;
                loginBtn.querySelector('.btn-text').style.display = 'inline';
                loginBtn.querySelector('.btn-loader').style.display = 'none';
            }
        }, 1500);
    };
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Forgot Password Functions
function showForgotPasswordModal(event) {
    event.preventDefault();
    document.getElementById('forgotPasswordModal').style.display = 'flex';
}

function closeForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('forgotEmail').value = '';
    document.getElementById('forgotEmailError').textContent = '';
}

function closeResetPasswordModal() {
    document.getElementById('resetPasswordModal').style.display = 'none';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
    document.getElementById('newPasswordError').textContent = '';
    document.getElementById('confirmNewPasswordError').textContent = '';
}

function toggleNewPassword() {
    const passwordInput = document.getElementById('newPassword');
    const eyeIcon = document.getElementById('eyeIconNew');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

function toggleConfirmNewPassword() {
    const passwordInput = document.getElementById('confirmNewPassword');
    const eyeIcon = document.getElementById('eyeIconConfirm');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Handle forgot password form - Step 1: Verify email
if (document.getElementById('forgotPasswordForm')) {
    document.getElementById('forgotPasswordForm').onsubmit = function(e) {
        e.preventDefault();
        
        const email = document.getElementById('forgotEmail').value;
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Clear previous errors
        document.getElementById('forgotEmailError').textContent = '';
        
        // Check if email exists
        if (user.email === email) {
            // Email found, show reset password modal
            closeForgotPasswordModal();
            document.getElementById('resetPasswordModal').style.display = 'flex';
        } else {
            document.getElementById('forgotEmailError').textContent = '❌ Email không tồn tại trong hệ thống';
        }
    };
}

// Handle reset password form - Step 2: Set new password
if (document.getElementById('resetPasswordForm')) {
    document.getElementById('resetPasswordForm').onsubmit = function(e) {
        e.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        // Clear previous errors
        document.getElementById('newPasswordError').textContent = '';
        document.getElementById('confirmNewPasswordError').textContent = '';
        
        let hasError = false;
        
        // Validate password length
        if (newPassword.length < 6) {
            document.getElementById('newPasswordError').textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
            hasError = true;
        }
        
        // Validate password match
        if (newPassword !== confirmNewPassword) {
            document.getElementById('confirmNewPasswordError').textContent = '❌ Mật khẩu xác nhận không khớp!';
            hasError = true;
        }
        
        if (hasError) return;
        
        // Update password in localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.password = newPassword;
        localStorage.setItem('user', JSON.stringify(user));
        
        closeResetPasswordModal();
        alert('✅ Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
    };
}



// Contact Form Handler
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').onsubmit = function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // Create mailto link
        const mailtoLink = `mailto:trcuong12112008@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Họ tên: ${name}\nEmail: ${email}\nSố điện thoại: ${phone}\n\nNội dung:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('✅ Đang mở ứng dụng email của bạn để gửi câu hỏi!');
        
        // Reset form
        this.reset();
    };
}
