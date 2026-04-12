// ===== TẠO ĐỀ THI JAVASCRIPT =====

// Global variables
let questions = [];
let currentEditIndex = -1;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeFormListeners();
    updateSummary();
});

// ===== GUIDE TOGGLE =====
function toggleGuide() {
    const guideContent = document.getElementById('guideContent');
    const guideToggle = document.querySelector('.guide-toggle');
    
    guideContent.classList.toggle('show');
    guideToggle.classList.toggle('active');
}

// ===== TAB SWITCHING =====
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and contents
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });
}

// ===== QUESTION MODAL =====
function openQuestionModal() {
    document.getElementById('questionModal').style.display = 'flex';
    currentEditIndex = -1;
    clearQuestionForm();
}

function closeQuestionModal() {
    document.getElementById('questionModal').style.display = 'none';
    clearQuestionForm();
}

function clearQuestionForm() {
    document.getElementById('questionContent').value = '';
    document.getElementById('answerA').value = '';
    document.getElementById('answerB').value = '';
    document.getElementById('answerC').value = '';
    document.getElementById('answerD').value = '';
    document.querySelectorAll('input[name="correctAnswer"]').forEach(radio => radio.checked = false);
    qiClear();
}

function saveQuestion() {
    const content = document.getElementById('questionContent').value.trim();
    const answerA = document.getElementById('answerA').value.trim();
    const answerB = document.getElementById('answerB').value.trim();
    const answerC = document.getElementById('answerC').value.trim();
    const answerD = document.getElementById('answerD').value.trim();
    const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked');
    
    // Validation
    if (!content) {
        epAlert('Thiếu nội dung', 'Vui lòng nhập nội dung câu hỏi!', 'warning');
        return;
    }
    
    if (!answerA || !answerB || !answerC || !answerD) {
        epAlert('Thiếu đáp án', 'Vui lòng nhập đầy đủ 4 đáp án!', 'warning');
        return;
    }
    
    if (!correctAnswer) {
        epAlert('Chưa chọn đáp án đúng', 'Vui lòng chọn đáp án đúng bằng cách click vào radio button.', 'warning');
        return;
    }
    
    const question = {
        content: content,
        image: document.getElementById('qiData').value || '',
        answers: {
            A: answerA,
            B: answerB,
            C: answerC,
            D: answerD
        },
        correct: correctAnswer.value
    };
    
    if (currentEditIndex >= 0) {
        // Edit existing question
        questions[currentEditIndex] = question;
    } else {
        // Add new question
        questions.push(question);
    }
    
    renderQuestions();
    closeQuestionModal();
    updateSummary();
    epToast('Đã lưu câu hỏi ✅', 'success');
}

function renderQuestions() {
    const container = document.getElementById('questionsList');
    
    if (questions.length === 0) {
        container.innerHTML = '<p class="empty-state">Chưa có câu hỏi nào. Nhấn "Thêm câu hỏi" để bắt đầu!</p>';
        return;
    }
    
    container.innerHTML = questions.map((q, index) => `
        <div class="question-card">
            <div class="question-number">Câu ${index + 1}</div>
            ${q.image ? `<img src="${q.image}" class="question-img" alt="Ảnh câu ${index+1}">` : ''}
            <div class="question-text">${q.content}</div>
            <div class="question-answers">
                <div class="answer-option ${q.correct === 'A' ? 'correct' : ''}">
                    A. ${q.answers.A}
                </div>
                <div class="answer-option ${q.correct === 'B' ? 'correct' : ''}">
                    B. ${q.answers.B}
                </div>
                <div class="answer-option ${q.correct === 'C' ? 'correct' : ''}">
                    C. ${q.answers.C}
                </div>
                <div class="answer-option ${q.correct === 'D' ? 'correct' : ''}">
                    D. ${q.answers.D}
                </div>
            </div>
            <div class="question-actions">
                <button class="btn-edit" onclick="editQuestion(${index})">✏️ Sửa</button>
                <button class="btn-delete" onclick="deleteQuestion(${index})">🗑️ Xoá</button>
            </div>
        </div>
    `).join('');
}

function editQuestion(index) {
    currentEditIndex = index;
    const question = questions[index];
    
    document.getElementById('questionContent').value = question.content;
    document.getElementById('answerA').value = question.answers.A;
    document.getElementById('answerB').value = question.answers.B;
    document.getElementById('answerC').value = question.answers.C;
    document.getElementById('answerD').value = question.answers.D;
    document.getElementById('correct' + question.correct).checked = true;

    // Restore image
    if (question.image) {
        document.getElementById('qiData').value = question.image;
        document.getElementById('qiPreviewImg').src = question.image;
        document.getElementById('qiPreview').style.display = 'flex';
    } else {
        qiClear();
    }
    
    document.getElementById('questionModal').style.display = 'flex';
}

function deleteQuestion(index) {
    epConfirm('Xóa câu hỏi?', 'Bạn có chắc muốn xóa câu hỏi này không?', { okText: '🗑️ Xóa', cancelText: 'Hủy' }).then(function(ok) {
        if (!ok) return;
        questions.splice(index, 1);
        renderQuestions();
        updateSummary();
        epToast('Đã xóa câu hỏi', 'success');
    });
}

// ===== FORM LISTENERS =====
function initializeFormListeners() {
    // Update summary when inputs change
    document.getElementById('questionCount').addEventListener('input', updateSummary);
    document.getElementById('examDuration').addEventListener('input', updateSummary);
    
    document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
        radio.addEventListener('change', updateSummary);
    });
}

function updateSummary() {
    const questionCount = questions.length > 0 ? questions.length : document.getElementById('questionCount').value;
    const duration = document.getElementById('examDuration').value;
    const difficulty = document.querySelector('input[name="difficulty"]:checked');
    
    document.getElementById('summaryQuestions').textContent = questionCount;
    document.getElementById('summaryTime').textContent = duration + ' phút';
    
    if (difficulty) {
        const difficultyText = {
            'easy': 'Cơ bản',
            'medium': 'Trung bình',
            'hard': 'Nâng cao',
            'mixed': 'Tổng hợp'
        };
        document.getElementById('summaryDifficulty').textContent = difficultyText[difficulty.value];
    }
}

// ===== ACTIONS =====
function previewExam() {
    const examData = collectExamData();
    
    if (!validateExamData(examData)) {
        return;
    }
    
    // Create preview modal
    const previewHTML = `
        <div class="modal-overlay" onclick="this.remove()">
            <div class="modal-container" onclick="event.stopPropagation()" style="max-width: 800px;">
                <div class="modal-header">
                    <h3>👁️ Xem trước đề thi</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 2rem; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                        <h2 style="color: #667eea; margin-bottom: 1rem;">${examData.name}</h2>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                            <p><strong>Lớp:</strong> ${examData.grade}</p>
                            <p><strong>Môn:</strong> ${examData.subject}</p>
                            <p><strong>Số câu:</strong> ${examData.questionCount}</p>
                            <p><strong>Thời gian:</strong> ${examData.duration} phút</p>
                            <p><strong>Mức độ:</strong> ${examData.difficulty}</p>
                            ${examData.topic ? `<p><strong>Chủ đề:</strong> ${examData.topic}</p>` : ''}
                        </div>
                    </div>
                    
                    ${examData.questions.length > 0 ? `
                        <h3 style="margin-bottom: 1rem;">Danh sách câu hỏi:</h3>
                        ${examData.questions.map((q, i) => `
                            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                                <p style="font-weight: 600; margin-bottom: 0.5rem;">Câu ${i + 1}: ${q.content}</p>
                                <div style="margin-left: 1rem;">
                                    <p style="color: ${q.correct === 'A' ? '#28a745' : '#555'}; font-weight: ${q.correct === 'A' ? '600' : '400'};">A. ${q.answers.A}</p>
                                    <p style="color: ${q.correct === 'B' ? '#28a745' : '#555'}; font-weight: ${q.correct === 'B' ? '600' : '400'};">B. ${q.answers.B}</p>
                                    <p style="color: ${q.correct === 'C' ? '#28a745' : '#555'}; font-weight: ${q.correct === 'C' ? '600' : '400'};">C. ${q.answers.C}</p>
                                    <p style="color: ${q.correct === 'D' ? '#28a745' : '#555'}; font-weight: ${q.correct === 'D' ? '600' : '400'};">D. ${q.answers.D}</p>
                                </div>
                            </div>
                        `).join('')}
                    ` : '<p style="color: #95a5a6; text-align: center; padding: 2rem;">Chưa có câu hỏi nào</p>'}
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" onclick="this.closest('.modal-overlay').remove()">Đóng</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', previewHTML);
}

function saveExam() {
    const examData = collectExamData();
    
    if (!validateExamData(examData)) {
        return;
    }
    
    examData.id = Date.now();
    examData.createdAt = new Date().toLocaleDateString('vi-VN');

    // Lưu vào myExams (dùng cho trang tạo đề)
    let savedExams = JSON.parse(localStorage.getItem('myExams') || '[]');
    savedExams.push(examData);
    localStorage.setItem('myExams', JSON.stringify(savedExams));

    // Đồng bộ sang customExams để luyen-thi.html đọc được
    const subjectIdMap = {
        'Toán': 'toan', 'Văn': 'van', 'Anh': 'anh',
        'Lý': 'ly', 'Hóa': 'hoa', 'Sinh': 'sinh',
        'Sử': 'su', 'Địa': 'dia', 'GDCD': 'gdcd'
    };
    const customExam = {
        id: examData.id,
        title: examData.name,
        subject: examData.subject,
        subjectId: subjectIdMap[examData.subject] || examData.subject,
        grade: examData.grade,
        questions: examData.questionCount,
        time: examData.duration,
        difficulty: examData.difficulty,
        questionsData: examData.questions,
        shuffle: examData.shuffle,
        showAnswers: examData.showAnswers,
        createdAt: examData.createdAt,
        isCustom: true
    };
    let customExams = JSON.parse(localStorage.getItem('customExams') || '[]');
    customExams.push(customExam);
    localStorage.setItem('customExams', JSON.stringify(customExams));
    epAlert('Lưu thành công! 🎉', 'Đề thi đã được lưu và thêm vào trang Luyện thi.', 'success');
    loadSavedExams();
    document.getElementById('savedExamsSection').scrollIntoView({ behavior: 'smooth' });
}

function startExam() {
    const examData = collectExamData();
    
    if (!validateExamData(examData)) {
        return;
    }
    
    // Save exam data to sessionStorage for the exam page
    sessionStorage.setItem('currentExam', JSON.stringify(examData));
    
    // Redirect to exam taking page
    window.location.href = 'lam-bai-thi.html';
}

// ===== HELPER FUNCTIONS =====
function collectExamData() {
    const name = document.getElementById('examName').value.trim();
    const grade = document.getElementById('examGrade').value;
    const subject = document.getElementById('examSubject').value;
    const topic = document.getElementById('examTopic').value.trim();
    const questionCount = document.getElementById('questionCount').value;
    const duration = document.getElementById('examDuration').value;
    const difficulty = document.querySelector('input[name="difficulty"]:checked')?.value;
    const shuffle = document.getElementById('shuffleQuestions').checked;
    const showAnswers = document.getElementById('showAnswers').checked;
    
    const subjectNames = {
        'toan': 'Toán',
        'van': 'Văn',
        'anh': 'Anh',
        'ly': 'Lý',
        'hoa': 'Hóa',
        'sinh': 'Sinh',
        'su': 'Sử',
        'dia': 'Địa',
        'gdcd': 'GDCD'
    };
    
    const difficultyNames = {
        'easy': 'Cơ bản',
        'medium': 'Trung bình',
        'hard': 'Nâng cao',
        'mixed': 'Tổng hợp'
    };
    
    return {
        name,
        grade,
        subject: subjectNames[subject] || subject,
        topic,
        questionCount: parseInt(questionCount),
        duration: parseInt(duration),
        difficulty: difficultyNames[difficulty] || difficulty,
        shuffle,
        showAnswers,
        questions: questions
    };
}

function validateExamData(data) {
    if (!data.name) {
        epAlert('Thiếu tên đề', 'Vui lòng nhập tên đề thi!', 'warning');
        document.getElementById('examName').focus();
        return false;
    }
    
    if (!data.grade) {
        epAlert('Chưa chọn lớp', 'Vui lòng chọn lớp!', 'warning');
        document.getElementById('examGrade').focus();
        return false;
    }
    
    if (!data.subject) {
        epAlert('Chưa chọn môn', 'Vui lòng chọn môn học!', 'warning');
        document.getElementById('examSubject').focus();
        return false;
    }
    
    if (questions.length === 0) {
        epAlert('Chưa có câu hỏi', 'Vui lòng thêm ít nhất 1 câu hỏi!', 'warning');
        return false;
    }
    
    return true;
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});

// ===== AI JSON IMPORT =====
function copyPrompt() {
    const promptText = document.getElementById('aiPrompt').textContent;
    
    navigator.clipboard.writeText(promptText).then(() => {
        const btn = document.querySelector('.btn-copy-prompt');
        const originalText = btn.textContent;
        btn.textContent = '✅ Đã copy!';
        btn.style.background = '#27ae60';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#3498db';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('❌ Không thể copy. Vui lòng copy thủ công!');
    });
}

function clearJSON() {
    document.getElementById('aiJsonInput').value = '';
}

function validateAndImportJSON() {
    const jsonInput = document.getElementById('aiJsonInput').value.trim();
    
    if (!jsonInput) {
        epAlert('Chưa có JSON', 'Vui lòng dán JSON từ AI vào ô bên trên!', 'warning');
        return;
    }
    
    try {
        // Parse JSON
        const parsedQuestions = JSON.parse(jsonInput);
        
        // Validate structure
        if (!Array.isArray(parsedQuestions)) {
            throw new Error('JSON phải là một mảng (array)');
        }
        
        if (parsedQuestions.length === 0) {
            throw new Error('Mảng không có câu hỏi nào');
        }
        
        // Validate each question
        const validQuestions = [];
        for (let i = 0; i < parsedQuestions.length; i++) {
            const q = parsedQuestions[i];
            
            // Check required fields
            if (!q.content || typeof q.content !== 'string') {
                throw new Error(`Câu ${i + 1}: Thiếu hoặc sai trường "content"`);
            }
            
            if (!q.answers || typeof q.answers !== 'object') {
                throw new Error(`Câu ${i + 1}: Thiếu hoặc sai trường "answers"`);
            }
            
            if (!q.answers.A || !q.answers.B) {
                throw new Error(`Câu ${i + 1}: Phải có ít nhất đáp án A và B`);
            }
            
            if (!q.correct || !['A', 'B', 'C', 'D'].includes(q.correct.toUpperCase())) {
                throw new Error(`Câu ${i + 1}: Trường "correct" phải là A, B, C hoặc D`);
            }
            
            // Add to valid questions
            validQuestions.push({
                content: q.content.trim(),
                answers: {
                    A: (q.answers.A || '').trim(),
                    B: (q.answers.B || '').trim(),
                    C: (q.answers.C || '').trim(),
                    D: (q.answers.D || '').trim()
                },
                correct: q.correct.toUpperCase()
            });
        }
        
        // Import questions
        questions.push(...validQuestions);
        
        // Switch to manual tab to show questions
        document.querySelector('.tab-btn[data-tab="manual"]').click();
        
        // Render questions
        renderQuestions();
        updateSummary();
        
        // Clear input
        document.getElementById('aiJsonInput').value = '';
        
        // Show success
        epToast(`Đã nhập ${validQuestions.length} câu hỏi từ AI ✅`, 'success');
        
        console.log('✅ Imported questions from AI:', validQuestions);
        
    } catch (error) {
        console.error('JSON parse error:', error);
        epAlert('Lỗi định dạng JSON', error.message + '\n\nVui lòng kiểm tra lại JSON từ AI.', 'error');
    }
}

// ===== TÍNH NĂNG MỞ RỘNG (Comment) =====

/*
// 1. LƯU ĐỀ VÀO TÀI KHOẢN HỌC SINH
function saveToUserAccount(examData) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        epAlert('Chưa đăng nhập', 'Vui lòng đăng nhập để lưu đề thi!', 'warning');
        return;
    }
    
    // Save to user's exam collection
    let userExams = JSON.parse(localStorage.getItem(`exams_${userId}`) || '[]');
    userExams.push(examData);
    localStorage.setItem(`exams_${userId}`, JSON.stringify(userExams));
}

// 2. RANDOM CÂU HỎI
function shuffleQuestions(questions) {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 3. CHẤM ĐIỂM TỰ ĐỘNG
function calculateScore(userAnswers, correctAnswers) {
    let correct = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            correct++;
        }
    });
    return (correct / correctAnswers.length) * 10;
}

// 4. THỐNG KÊ ĐIỂM
function getExamStatistics(examId) {
    const results = JSON.parse(localStorage.getItem(`results_${examId}`) || '[]');
    
    if (results.length === 0) return null;
    
    const scores = results.map(r => r.score);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    
    return {
        totalAttempts: results.length,
        avgScore: avgScore.toFixed(2),
        maxScore,
        minScore,
        passRate: (scores.filter(s => s >= 5).length / scores.length * 100).toFixed(1)
    };
}

// 5. XUẤT PDF ĐỀ
function exportToPDF(examData) {
    // Sử dụng thư viện jsPDF
    // npm install jspdf
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(examData.name, 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Môn: ${examData.subject} - Lớp: ${examData.grade}`, 20, 35);
    doc.text(`Thời gian: ${examData.duration} phút`, 20, 42);
    
    let yPos = 55;
    examData.questions.forEach((q, index) => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFont('helvetica', 'bold');
        doc.text(`Câu ${index + 1}: ${q.content}`, 20, yPos);
        yPos += 7;
        
        doc.setFont('helvetica', 'normal');
        doc.text(`A. ${q.answers.A}`, 25, yPos);
        yPos += 7;
        doc.text(`B. ${q.answers.B}`, 25, yPos);
        yPos += 7;
        doc.text(`C. ${q.answers.C}`, 25, yPos);
        yPos += 7;
        doc.text(`D. ${q.answers.D}`, 25, yPos);
        yPos += 10;
    });
    
    doc.save(`${examData.name}.pdf`);
}

// 6. IMPORT CÂU HỎI TỪ EXCEL
function importFromExcel(file) {
    // Sử dụng thư viện xlsx
    // npm install xlsx
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        // Parse questions from Excel
        const importedQuestions = jsonData.map(row => ({
            content: row['Câu hỏi'],
            answers: {
                A: row['Đáp án A'],
                B: row['Đáp án B'],
                C: row['Đáp án C'],
                D: row['Đáp án D']
            },
            correct: row['Đáp án đúng']
        }));
        
        questions.push(...importedQuestions);
        renderQuestions();
        updateSummary();
    };
    reader.readAsArrayBuffer(file);
}

// 7. TẠO MÃ ĐỀ NGẪU NHIÊN
function generateExamCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    });
    return code;
}

// 8. CHIA SẺ ĐỀ THI
function shareExam(examId) {
    const shareUrl = `${window.location.origin}/lam-bai-thi.html?id=${examId}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Đề thi EduPass',
            text: 'Làm bài thi cùng tôi trên EduPass!',
            url: shareUrl
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareUrl);
        epToast('Đã copy link chia sẻ ', 'success');
    }
}
*/


// ===== LOAD SAVED EXAMS =====
function loadSavedExams() {
    const savedExams = JSON.parse(localStorage.getItem('myExams') || '[]');
    const section = document.getElementById('savedExamsSection');
    const grid = document.getElementById('savedExamsGrid');
    
    if (savedExams.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    
    grid.innerHTML = savedExams.map((exam, index) => `
        <div class="saved-exam-card">
            <div class="saved-exam-header">
                <div>
                    <div class="saved-exam-title">${exam.name}</div>
                    <div class="saved-exam-date">📅 ${exam.createdAt}</div>
                </div>
            </div>
            <div class="saved-exam-meta">
                <span>📚 ${exam.subject}</span>
                <span>🎓 Lớp ${exam.grade}</span>
                <span>📝 ${exam.questions.length} câu</span>
                <span>⏱️ ${exam.duration} phút</span>
            </div>
            ${exam.topic ? `<div style="color: #6c757d; font-size: 0.9rem; margin: 0.5rem 0;">🎯 ${exam.topic}</div>` : ''}
            <div class="saved-exam-actions">
                <button class="btn-start-saved" onclick="startSavedExam(${index})">
                    ▶️ Làm bài
                </button>
                <button class="btn-delete-saved" onclick="deleteSavedExam(${index})">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

function startSavedExam(index) {
    const savedExams = JSON.parse(localStorage.getItem('myExams') || '[]');
    const exam = savedExams[index];
    
    if (!exam) {
        epAlert('Không tìm thấy', 'Không tìm thấy đề thi này!', 'error');
        return;
    }
    
    // Save to sessionStorage and redirect
    sessionStorage.setItem('currentExam', JSON.stringify(exam));
    window.location.href = 'lam-bai-thi.html';
}

function deleteSavedExam(index) {
    epConfirm('Xóa đề thi?', 'Bạn có chắc muốn xóa đề thi này không?', { okText: '🗑️ Xóa', cancelText: 'Hủy' }).then(function(ok) {
        if (!ok) return;
        let savedExams = JSON.parse(localStorage.getItem('myExams') || '[]');
        savedExams.splice(index, 1);
        localStorage.setItem('myExams', JSON.stringify(savedExams));
        epToast('Đã xóa đề thi', 'success');
        loadSavedExams();
    });
}

// Load saved exams on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedExams();
});

// ===== QUESTION IMAGE HELPERS =====
function qiSwitchTab(type, btn) {
    btn.parentNode.querySelectorAll('.qi-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('qiFileWrap').style.display = type === 'file' ? '' : 'none';
    document.getElementById('qiUrlWrap').style.display  = type === 'url'  ? '' : 'none';
    if (type === 'url') setTimeout(() => document.getElementById('qiUrlInput').focus(), 80);
}

function qiPreviewFile() {
    const file = document.getElementById('qiFileInput').files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { epToast('Ảnh tối đa 3MB ⚠️', 'warning'); return; }
    const reader = new FileReader();
    reader.onload = e => qiSetPreview(e.target.result);
    reader.readAsDataURL(file);
}

function qiPreviewUrl() {
    const url = document.getElementById('qiUrlInput').value.trim();
    if (!url) { qiClear(); return; }
    const normalized = qiNormalizeUrl(url);
    // Thử trực tiếp, fallback qua proxy
    const img = new Image();
    img.onload = () => qiSetPreview(normalized);
    img.onerror = () => {
        const proxies = [
            'https://corsproxy.io/?' + encodeURIComponent(normalized),
            'https://images.weserv.nl/?url=' + encodeURIComponent(normalized),
            'https://api.allorigins.win/raw?url=' + encodeURIComponent(normalized)
        ];
        qiTryProxies(proxies, 0, normalized);
    };
    img.src = normalized;
}

function qiTryProxies(proxies, idx, original) {
    if (idx >= proxies.length) { qiSetPreview(original); return; }
    const img = new Image();
    img.onload = () => qiSetPreview(proxies[idx]);
    img.onerror = () => qiTryProxies(proxies, idx + 1, original);
    img.src = proxies[idx];
}

function qiSetPreview(src) {
    document.getElementById('qiData').value = src;
    document.getElementById('qiPreviewImg').src = src;
    document.getElementById('qiPreview').style.display = 'flex';
}

function qiClear() {
    document.getElementById('qiData').value = '';
    const prev = document.getElementById('qiPreview');
    if (prev) { prev.style.display = 'none'; prev.querySelector('img').src = ''; }
    const fi = document.getElementById('qiFileInput'); if (fi) fi.value = '';
    const ui = document.getElementById('qiUrlInput');  if (ui) ui.value = '';
}

function qiNormalizeUrl(url) {
    const gdrive = url.match(/drive\.google\.com\/file\/d\/([^\/\?]+)/);
    if (gdrive) return 'https://drive.google.com/uc?export=view&id=' + gdrive[1];
    const gopen = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
    if (gopen) return 'https://drive.google.com/uc?export=view&id=' + gopen[1];
    return url;
}
