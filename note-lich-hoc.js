// ===== Note & Lịch học =====

// ---- UTILS ----
function saveData(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
function loadData(key, def) { try { return JSON.parse(localStorage.getItem(key)) || def; } catch(e) { return def; } }

// ---- TABS ----
function switchTab(tab) {
    document.querySelectorAll('.nlh-tab').forEach(function(t){ t.classList.toggle('active', t.dataset.tab === tab); });
    document.querySelectorAll('.nlh-panel').forEach(function(p){ p.classList.toggle('active', p.id === 'tab-' + tab); });
}

// ==============================
// ========== NOTES =============
// ==============================
var notes = loadData('nlh_notes', []);
var currentNoteId = null;

function genId() { return Date.now() + Math.random().toString(36).slice(2); }

function renderNotesList(filter) {
    var list = document.getElementById('notesList');
    if (!list) return;
    var filtered = filter ? notes.filter(function(n){
        return n.title.toLowerCase().includes(filter.toLowerCase()) ||
               n.content.toLowerCase().includes(filter.toLowerCase());
    }) : notes;
    if (filtered.length === 0) {
        list.innerHTML = '<li class="nlh-notes-empty">Chưa có ghi chú nào</li>';
        return;
    }
    list.innerHTML = filtered.map(function(n) {
        var preview = n.content.replace(/\n/g,' ').slice(0, 60) || 'Chưa có nội dung';
        var date = new Date(n.updatedAt).toLocaleDateString('vi-VN');
        return '<li class="nlh-note-item color-' + n.color + (n.id === currentNoteId ? ' active' : '') + '" onclick="openNote(\'' + n.id + '\')">' +
            '<div class="nlh-note-item-title">' + escHtml(n.title || 'Ghi chú không tên') + '</div>' +
            '<div class="nlh-note-item-preview">' + escHtml(preview) + '</div>' +
            '<div class="nlh-note-item-date">' + date + '</div>' +
        '</li>';
    }).join('');
}

function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function addNote() {
    var note = { id: genId(), title: '', content: '', color: 'yellow', updatedAt: Date.now() };
    notes.unshift(note);
    saveData('nlh_notes', notes);
    openNote(note.id);
    renderNotesList();
    document.getElementById('noteTitle').focus();
}

function openNote(id) {
    currentNoteId = id;
    var note = notes.find(function(n){ return n.id === id; });
    if (!note) return;
    document.getElementById('editorEmpty').style.display = 'none';
    document.getElementById('editorActive').style.display = 'flex';
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    document.getElementById('noteColor').value = note.color;
    updateWordCount();
    updateLastSaved(note.updatedAt);
    renderNotesList();
}

function saveCurrentNote() {
    if (!currentNoteId) return;
    var idx = notes.findIndex(function(n){ return n.id === currentNoteId; });
    if (idx === -1) return;
    notes[idx].title = document.getElementById('noteTitle').value;
    notes[idx].content = document.getElementById('noteContent').value;
    notes[idx].color = document.getElementById('noteColor').value;
    notes[idx].updatedAt = Date.now();
    saveData('nlh_notes', notes);
    updateWordCount();
    updateLastSaved(notes[idx].updatedAt);
    renderNotesList();
}

function deleteCurrentNote() {
    if (!currentNoteId) return;
    if (!confirm('Xóa ghi chú này?')) return;
    notes = notes.filter(function(n){ return n.id !== currentNoteId; });
    saveData('nlh_notes', notes);
    currentNoteId = null;
    document.getElementById('editorEmpty').style.display = 'flex';
    document.getElementById('editorActive').style.display = 'none';
    renderNotesList();
}

function filterNotes(val) { renderNotesList(val); }

function updateWordCount() {
    var content = document.getElementById('noteContent').value;
    var words = content.trim() ? content.trim().split(/\s+/).length : 0;
    var el = document.getElementById('noteWordCount');
    if (el) el.textContent = words + ' từ';
}

function updateLastSaved(ts) {
    var el = document.getElementById('noteLastSaved');
    if (!el) return;
    var d = new Date(ts);
    el.textContent = 'Đã lưu ' + d.toLocaleTimeString('vi-VN', {hour:'2-digit',minute:'2-digit'});
}

// ==============================
// ========= SCHEDULE ===========
// ==============================
var tasks = loadData('nlh_tasks', {});
var currentYear, currentMonth, selectedDate = null;
var selectedTaskColor = 'blue';

function initCalendar() {
    var now = new Date();
    currentYear = now.getFullYear();
    currentMonth = now.getMonth();
    renderCalendar();
}

function changeMonth(dir) {
    currentMonth += dir;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    if (currentMonth < 0)  { currentMonth = 11; currentYear--; }
    renderCalendar();
}

function renderCalendar() {
    var title = document.getElementById('calTitle');
    var grid = document.getElementById('calGrid');
    if (!title || !grid) return;
    var months = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6',
                  'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
    title.textContent = months[currentMonth] + ' ' + currentYear;
    var firstDay = new Date(currentYear, currentMonth, 1).getDay();
    var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    var daysInPrev = new Date(currentYear, currentMonth, 0).getDate();
    var today = new Date();
    var html = '';
    for (var i = firstDay - 1; i >= 0; i--) {
        html += '<div class="nlh-cal-day other-month">' + (daysInPrev - i) + '</div>';
    }
    for (var d = 1; d <= daysInMonth; d++) {
        var dateKey = currentYear + '-' + pad2(currentMonth+1) + '-' + pad2(d);
        var isToday = (d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear());
        var isSelected = (dateKey === selectedDate);
        var hasTask = tasks[dateKey] && tasks[dateKey].length > 0;
        var cls = 'nlh-cal-day';
        if (isToday) cls += ' today';
        if (isSelected) cls += ' selected';
        if (hasTask) cls += ' has-task';
        html += '<div class="' + cls + '" onclick="selectDate(\'' + dateKey + '\')">' + d + '</div>';
    }
    var total = firstDay + daysInMonth;
    var remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (var n = 1; n <= remaining; n++) {
        html += '<div class="nlh-cal-day other-month">' + n + '</div>';
    }
    grid.innerHTML = html;
}

function pad2(n) { return n < 10 ? '0' + n : '' + n; }

function selectDate(dateKey) {
    selectedDate = dateKey;
    renderCalendar();
    renderTasks();
    var btn = document.getElementById('btnAddTask');
    if (btn) btn.style.display = 'flex';
    var parts = dateKey.split('-');
    var title = document.getElementById('tasksDateTitle');
    if (title) title.textContent = 'Lịch ngày ' + parseInt(parts[2]) + '/' + parseInt(parts[1]) + '/' + parts[0];
}

function renderTasks() {
    var list = document.getElementById('tasksList');
    if (!list || !selectedDate) return;
    var dayTasks = tasks[selectedDate] || [];
    if (dayTasks.length === 0) {
        list.innerHTML = '<li class="nlh-tasks-empty">Chưa có lịch học cho ngày này</li>';
        return;
    }
    list.innerHTML = dayTasks.map(function(t, idx) {
        var timeStr = t.timeStart && t.timeEnd ? t.timeStart + ' – ' + t.timeEnd : (t.timeStart || '');
        return '<li class="nlh-task-item color-' + t.color + (t.done ? ' done' : '') + '">' +
            '<div class="nlh-task-check ' + (t.done ? 'checked' : '') + '" onclick="toggleTask(' + idx + ')">' + (t.done ? '✓' : '') + '</div>' +
            '<div class="nlh-task-info">' +
                '<div class="nlh-task-subject">' + escHtml(t.subject) + '</div>' +
                (timeStr ? '<div class="nlh-task-time">⏰ ' + timeStr + '</div>' : '') +
            '</div>' +
            '<button class="nlh-task-delete" onclick="deleteTask(' + idx + ')">🗑</button>' +
        '</li>';
    }).join('');
}

function toggleTask(idx) {
    if (!selectedDate || !tasks[selectedDate]) return;
    tasks[selectedDate][idx].done = !tasks[selectedDate][idx].done;
    saveData('nlh_tasks', tasks);
    renderTasks();
}

function deleteTask(idx) {
    if (!selectedDate) return;
    tasks[selectedDate].splice(idx, 1);
    saveData('nlh_tasks', tasks);
    renderTasks();
    renderCalendar();
}

function openAddTask() {
    document.getElementById('taskModal').style.display = 'flex';
    document.getElementById('taskSubject').value = '';
    document.getElementById('taskTimeStart').value = '';
    document.getElementById('taskTimeEnd').value = '';
    selectedTaskColor = 'blue';
    document.querySelectorAll('.nlh-color-dot').forEach(function(d){
        d.classList.toggle('active', d.dataset.color === 'blue');
    });
    setTimeout(function(){ document.getElementById('taskSubject').focus(); }, 100);
}

function closeAddTask() { document.getElementById('taskModal').style.display = 'none'; }

function selectTaskColor(color, el) {
    selectedTaskColor = color;
    document.querySelectorAll('.nlh-color-dot').forEach(function(d){ d.classList.remove('active'); });
    el.classList.add('active');
}

function saveTask() {
    var subject = document.getElementById('taskSubject').value.trim();
    if (!subject) { document.getElementById('taskSubject').focus(); return; }
    if (!tasks[selectedDate]) tasks[selectedDate] = [];
    tasks[selectedDate].push({
        subject: subject,
        timeStart: document.getElementById('taskTimeStart').value,
        timeEnd: document.getElementById('taskTimeEnd').value,
        color: selectedTaskColor,
        done: false
    });
    saveData('nlh_tasks', tasks);
    closeAddTask();
    renderTasks();
    renderCalendar();
}

// ==============================
// ========== TIMER =============
// ==============================

var pomoTotalSecs = 25 * 60;
var pomoRemaining = pomoTotalSecs;
var pomoRunning = false;
var pomoInterval = null;
var pomoSessions = loadData('nlh_pomo_sessions', { date: '', count: 0, focusMins: 0 });
var pomoCurrentMins = 25;
var pomoCurrentLabel = 'Tập trung';
var CIRCUMFERENCE = 2 * Math.PI * 88;

function setPomoMode(el, mins, label) {
    if (pomoRunning) return;
    document.querySelectorAll('.nlh-pomo-mode').forEach(function(b){ b.classList.remove('active'); });
    el.classList.add('active');
    pomoCurrentMins = mins;
    pomoCurrentLabel = label;
    pomoTotalSecs = mins * 60;
    pomoRemaining = pomoTotalSecs;
    document.getElementById('pomoLabel').textContent = label;
    document.getElementById('customMins').value = mins;
    updatePomoDisplay();
    updatePomoRing();
}

function applyCustomTime() {
    if (pomoRunning) return;
    var mins = parseInt(document.getElementById('customMins').value);
    if (!mins || mins < 1) return;
    document.querySelectorAll('.nlh-pomo-mode').forEach(function(b){ b.classList.remove('active'); });
    pomoCurrentMins = mins;
    pomoCurrentLabel = 'Tùy chỉnh';
    pomoTotalSecs = mins * 60;
    pomoRemaining = pomoTotalSecs;
    document.getElementById('pomoLabel').textContent = 'Tùy chỉnh (' + mins + ' phút)';
    updatePomoDisplay();
    updatePomoRing();
}

function pomoStart() {
    if (pomoRunning) {
        clearInterval(pomoInterval);
        pomoRunning = false;
        document.getElementById('pomoBtnStart').textContent = '▶ Tiếp tục';
    } else {
        pomoRunning = true;
        document.getElementById('pomoBtnStart').textContent = '⏸ Tạm dừng';
        pomoInterval = setInterval(function() {
            pomoRemaining--;
            updatePomoDisplay();
            updatePomoRing();
            if (pomoRemaining <= 0) {
                clearInterval(pomoInterval);
                pomoRunning = false;
                document.getElementById('pomoBtnStart').textContent = '▶ Bắt đầu';
                if (pomoCurrentLabel === 'Tập trung' || pomoCurrentLabel === 'Tùy chỉnh') {
                    var today = new Date().toDateString();
                    if (pomoSessions.date !== today) pomoSessions = { date: today, count: 0, focusMins: 0 };
                    pomoSessions.count++;
                    pomoSessions.focusMins += pomoCurrentMins;
                    saveData('nlh_pomo_sessions', pomoSessions);
                    updatePomoStats();
                }
                playBell();
                if (Notification && Notification.permission === 'granted') {
                    new Notification('EduPass ⏰', { body: pomoCurrentLabel + ' kết thúc!' });
                }
            }
        }, 1000);
    }
}

function pomoReset() {
    clearInterval(pomoInterval);
    pomoRunning = false;
    pomoRemaining = pomoTotalSecs;
    document.getElementById('pomoBtnStart').textContent = '▶ Bắt đầu';
    updatePomoDisplay();
    updatePomoRing();
}

function updatePomoDisplay() {
    var m = Math.floor(pomoRemaining / 60);
    var s = pomoRemaining % 60;
    document.getElementById('pomoDisplay').textContent = pad2(m) + ':' + pad2(s);
}

function updatePomoRing() {
    var ring = document.getElementById('pomoRing');
    if (!ring) return;
    var pct = pomoRemaining / pomoTotalSecs;
    ring.style.strokeDasharray = CIRCUMFERENCE;
    ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);
}

function playBell() {
    try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        [0, 0.5, 1.0].forEach(function(delay) {
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime + delay);
            osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + delay + 0.4);
            gain.gain.setValueAtTime(0.6, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.6);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + 0.6);
        });
    } catch(e) {}
}

function updatePomoStats() {
    var today = new Date().toDateString();
    if (pomoSessions.date !== today) pomoSessions = { date: today, count: 0, focusMins: 0 };
    var el = document.getElementById('statPomoCount');
    var el2 = document.getElementById('statFocusTime');
    if (el) el.textContent = pomoSessions.count;
    if (el2) el2.textContent = pomoSessions.focusMins + ' phút';
    var dots = document.getElementById('pomoSessionDots');
    var count = document.getElementById('pomoSessionCount');
    if (dots) {
        var html = '';
        for (var i = 0; i < 4; i++) {
            html += '<div class="pomo-dot' + (i < (pomoSessions.count % 4) ? ' done' : '') + '"></div>';
        }
        dots.innerHTML = html;
    }
    if (count) count.textContent = pomoSessions.count;
    updateStreak();
}

function updateStreak() {
    var streak = loadData('nlh_streak', { lastDate: '', count: 0 });
    var today = new Date().toDateString();
    var yesterday = new Date(Date.now() - 86400000).toDateString();
    if (streak.lastDate === today) {
        // already counted
    } else if (streak.lastDate === yesterday) {
        streak.count++;
        streak.lastDate = today;
        saveData('nlh_streak', streak);
    } else if (pomoSessions.count > 0) {
        streak.count = 1;
        streak.lastDate = today;
        saveData('nlh_streak', streak);
    }
    var el = document.getElementById('statStreak');
    if (el) el.textContent = streak.count;
}

// -- Stopwatch --
var swRunning = false;
var swStartTime = 0;
var swElapsed = 0;
var swInterval = null;
var swLapTimes = [];
var swLapElapsed = 0;

function swToggle() {
    if (swRunning) {
        clearInterval(swInterval);
        swRunning = false;
        swElapsed += Date.now() - swStartTime;
        document.getElementById('swBtnStart').textContent = '▶ Tiếp tục';
    } else {
        swRunning = true;
        swStartTime = Date.now();
        document.getElementById('swBtnStart').textContent = '⏸ Dừng';
        swInterval = setInterval(function() {
            var total = swElapsed + (Date.now() - swStartTime);
            document.getElementById('swDisplay').textContent = formatSw(total);
        }, 100);
    }
}

function swLap() {
    if (!swRunning && swElapsed === 0) return;
    var total = swElapsed + (swRunning ? Date.now() - swStartTime : 0);
    var lapTime = total - swLapElapsed;
    swLapElapsed = total;
    swLapTimes.unshift({ lap: swLapTimes.length + 1, time: lapTime });
    renderLaps();
}

function swReset() {
    clearInterval(swInterval);
    swRunning = false;
    swElapsed = 0;
    swLapElapsed = 0;
    swLapTimes = [];
    document.getElementById('swDisplay').textContent = '00:00:00';
    document.getElementById('swBtnStart').textContent = '▶ Bắt đầu';
    renderLaps();
}

function renderLaps() {
    var list = document.getElementById('swLaps');
    if (!list) return;
    list.innerHTML = swLapTimes.map(function(l) {
        return '<li class="nlh-sw-lap"><span>Lap ' + l.lap + '</span><span>' + formatSw(l.time) + '</span></li>';
    }).join('');
}

function formatSw(ms) {
    var h = Math.floor(ms / 3600000);
    var m = Math.floor((ms % 3600000) / 60000);
    var s = Math.floor((ms % 60000) / 1000);
    return pad2(h) + ':' + pad2(m) + ':' + pad2(s);
}

// ==============================
// ========== MUSIC =============
// ==============================

// Preset YouTube nhúng trực tiếp
var PRESETS = {
    lofi:      { type: 'yt', id: '5qap5aO4i9A' },   // lofi hip hop radio - beats to relax
    nature:    { type: 'yt', id: 'xNN7iTA57jM' },   // forest & rain sounds
    classical: { type: 'yt', id: 'jgpJVI3tDbY' },   // classical music for studying
    rain:      { type: 'yt', id: 'mPZkdNFkNps' }    // rain sounds
};

function loadPreset(key, el) {
    document.querySelectorAll('.nlh-music-preset').forEach(function(b){ b.classList.remove('active'); });
    if (el) el.classList.add('active');
    document.getElementById('musicLinkInput').value = '';
    hideYtNotice();
    loadYouTube(PRESETS[key].id);
}

function loadYouTube(videoId) {
    var player = document.getElementById('musicPlayer');
    var iframe = document.getElementById('musicIframe');
    var audio = document.getElementById('musicAudio');
    if (audio) { audio.pause(); audio.style.display = 'none'; }
    hideYtNotice();
    var src = 'https://www.youtube-nocookie.com/embed/' + videoId +
        '?autoplay=1&controls=1&rel=0&modestbranding=1&fs=0';
    iframe.className = 'nlh-music-iframe yt';
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.style.display = 'block';
    iframe.src = '';
    setTimeout(function(){ iframe.src = src; }, 80);
    player.style.display = 'block';
}

function playMusicLink() {
    var url = document.getElementById('musicLinkInput').value.trim();
    if (!url) return;
    document.querySelectorAll('.nlh-music-preset').forEach(function(b){ b.classList.remove('active'); });
    hideYtNotice();

    // YouTube → dùng IFrame API
    var ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
        loadYouTube(ytMatch[1]);
        return;
    }

    // Spotify
    if (url.includes('spotify.com')) {
        var embedUrl = url.replace('open.spotify.com/', 'open.spotify.com/embed/');
        showIframe(embedUrl);
        return;
    }

    // SoundCloud
    if (url.includes('soundcloud.com')) {
        showIframe('https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) +
            '&auto_play=true&color=%23667eea&hide_related=true&show_comments=false');
        return;
    }

    // MP3 / file âm thanh trực tiếp
    if (url.match(/\.(mp3|ogg|wav|aac|flac)(\?.*)?$/i)) {
        showAudio(url);
        return;
    }

    // Fallback iframe
    showIframe(url);
}

function showIframe(src) {
    var player = document.getElementById('musicPlayer');
    var iframe = document.getElementById('musicIframe');
    var audio = document.getElementById('musicAudio');
    if (audio) { audio.pause(); audio.style.display = 'none'; }
    iframe.style.display = 'block';
    iframe.src = '';
    setTimeout(function(){ iframe.src = src; }, 50);
    player.style.display = 'block';
}

function showAudio(src) {
    var player = document.getElementById('musicPlayer');
    var iframe = document.getElementById('musicIframe');
    var audio = document.getElementById('musicAudio');
    iframe.src = '';
    iframe.style.display = 'none';
    audio.style.display = 'block';
    audio.src = src;
    audio.volume = parseFloat(document.getElementById('musicVol').value);
    audio.play();
    player.style.display = 'block';
}

function hideYtNotice() {
    var n = document.getElementById('ytNotice');
    if (n) n.style.display = 'none';
}

function setMusicVol(val) {
    var audio = document.getElementById('musicAudio');
    if (audio) audio.volume = parseFloat(val);
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', function() {
    renderNotesList();
    initCalendar();

    // SVG gradient cho ring
    var svg = document.querySelector('.nlh-ring');
    if (svg) {
        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = '<linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">' +
            '<stop offset="0%" style="stop-color:#667eea"/>' +
            '<stop offset="100%" style="stop-color:#764ba2"/>' +
            '</linearGradient>';
        svg.insertBefore(defs, svg.firstChild);
    }
    updatePomoDisplay();
    updatePomoRing();
    updatePomoStats();

    if (Notification && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});
