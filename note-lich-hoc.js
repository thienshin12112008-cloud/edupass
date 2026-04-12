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
    epConfirm('Xóa ghi chú?', 'Ghi chú này sẽ bị xóa vĩnh viễn.', { okText: '🗑️ Xóa', cancelText: 'Hủy' }).then(function(ok) {
        if (!ok) return;
        notes = notes.filter(function(n){ return n.id !== currentNoteId; });
        saveData('nlh_notes', notes);
        currentNoteId = null;
        document.getElementById('editorEmpty').style.display = 'flex';
        document.getElementById('editorActive').style.display = 'none';
        renderNotesList();
        epToast('Đã xóa ghi chú', 'success');
    });
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

// ==============================
// ===== THỜI KHÓA BIỂU =========
// ==============================
var tkbWeekOffset = 0; // 0 = tuần hiện tại

function tkbGetWeekKey(offset) {
    var now = new Date();
    var day = now.getDay(); // 0=CN
    var monday = new Date(now);
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + offset * 7);
    var y = monday.getFullYear();
    var m = pad2(monday.getMonth() + 1);
    var d = pad2(monday.getDate());
    return 'tkb_' + y + '_' + m + '_' + d;
}

function tkbGetWeekDates(offset) {
    var now = new Date();
    var day = now.getDay();
    var monday = new Date(now);
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + offset * 7);
    var dates = [];
    for (var i = 0; i < 6; i++) {
        var d = new Date(monday);
        d.setDate(monday.getDate() + i);
        dates.push(d);
    }
    return dates;
}

function tkbRender() {
    var key = tkbGetWeekKey(tkbWeekOffset);
    var data = loadData(key, {});
    var dates = tkbGetWeekDates(tkbWeekOffset);

    // Week label
    var label = document.getElementById('tkbWeekLabel');
    if (label) {
        var start = dates[0];
        var end = dates[5];
        label.textContent = 'Tuần ' + start.getDate() + '/' + pad2(start.getMonth()+1) +
            ' – ' + end.getDate() + '/' + pad2(end.getMonth()+1) + '/' + end.getFullYear();
    }

    var sessions = [
        { label: '☀️ Sáng', slots: [1,2,3,4,5], displayStart: 1 },
        { label: '🌤️ Chiều', slots: [6,7,8,9,10], displayStart: 1 }
    ];

    var today = new Date();
    var todayStr = today.getFullYear() + '-' + pad2(today.getMonth()+1) + '-' + pad2(today.getDate());

    var html = '';
    sessions.forEach(function(session) {
        // Session header row
        html += '<tr class="tkb-session-row"><td colspan="7" class="tkb-session-label">' + session.label + '</td></tr>';
        session.slots.forEach(function(slot, idx) {
            var displayNum = session.displayStart + idx;
            html += '<tr class="tkb-row">';
            html += '<td class="tkb-slot-num">Tiết ' + displayNum + '</td>';
            for (var col = 0; col < 6; col++) {
                var d = dates[col];
                var dStr = d.getFullYear() + '-' + pad2(d.getMonth()+1) + '-' + pad2(d.getDate());
                var cellKey = 'slot_' + slot + '_col_' + col;
                var val = (data[cellKey] || '');
                var isToday = dStr === todayStr ? ' tkb-today-col' : '';
                html += '<td class="tkb-cell' + isToday + '">' +
                    '<input type="text" class="tkb-input" data-key="' + cellKey + '" value="' + escHtml(val) + '" placeholder="—">' +
                    '</td>';
            }
            html += '</tr>';
        });
    });

    document.getElementById('tkbBody').innerHTML = html;
}

function tkbSave() {
    var key = tkbGetWeekKey(tkbWeekOffset);
    var data = {};
    document.querySelectorAll('.tkb-input').forEach(function(inp) {
        data[inp.dataset.key] = inp.value;
    });
    saveData(key, data);
    var toast = document.getElementById('tkbToast');
    if (toast) {
        toast.classList.add('show');
        setTimeout(function(){ toast.classList.remove('show'); }, 2000);
    }
}

function tkbChangeWeek(dir) {
    tkbWeekOffset += dir;
    tkbRender();
}

function tkbGoToday() {
    tkbWeekOffset = 0;
    tkbRender();
}

// Init TKB khi tab được mở
var _origSwitchTab = switchTab;
switchTab = function(tab) {
    _origSwitchTab(tab);
    if (tab === 'timetable') tkbRender();
};

// ==============================
// ===== THÔNG BÁO ĐẾN HẠN ======
// ==============================

function checkDueTasks() {
    var now = new Date();
    var todayKey = now.getFullYear() + '-' + pad2(now.getMonth() + 1) + '-' + pad2(now.getDate());
    var todayTasks = tasks[todayKey] || [];
    var currentTime = pad2(now.getHours()) + ':' + pad2(now.getMinutes());

    todayTasks.forEach(function(task, idx) {
        if (task.done) return;
        if (!task.timeStart) return;

        // Thông báo đúng giờ bắt đầu
        if (task.timeStart === currentTime) {
            var notifKey = 'notif_' + todayKey + '_' + idx + '_start';
            if (!sessionStorage.getItem(notifKey)) {
                sessionStorage.setItem(notifKey, '1');
                showDueToast('⏰ Đến giờ rồi! ' + task.subject, 'start');
                sendBrowserNotif('⏰ Đến giờ học!', task.subject + ' — Bắt đầu ngay nào!');
            }
        }

        // Thông báo trước 5 phút
        var d = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
            parseInt(task.timeStart.split(':')[0]),
            parseInt(task.timeStart.split(':')[1]) - 5);
        var remind = pad2(d.getHours()) + ':' + pad2(d.getMinutes());
        if (remind === currentTime) {
            var remindKey = 'notif_' + todayKey + '_' + idx + '_remind';
            if (!sessionStorage.getItem(remindKey)) {
                sessionStorage.setItem(remindKey, '1');
                showDueToast('🔔 Còn 5 phút: ' + task.subject, 'remind');
                sendBrowserNotif('🔔 Nhắc nhở học tập', 'Còn 5 phút nữa: ' + task.subject);
            }
        }

        // Thông báo quá hạn (timeEnd đã qua mà chưa done)
        if (task.timeEnd) {
            var endParts = task.timeEnd.split(':');
            var endD = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
                parseInt(endParts[0]), parseInt(endParts[1]));
            // Thông báo ngay khi hết giờ
            var endTime = pad2(endD.getHours()) + ':' + pad2(endD.getMinutes());
            if (endTime === currentTime) {
                var endKey = 'notif_' + todayKey + '_' + idx + '_end';
                if (!sessionStorage.getItem(endKey)) {
                    sessionStorage.setItem(endKey, '1');
                    showDueToast('❗ Chưa hoàn thành: ' + task.subject, 'overdue');
                    sendBrowserNotif('❗ Chưa hoàn thành!', task.subject + ' — Hãy đánh dấu hoàn thành nhé!');
                }
            }
        }
    });
}

function showDueToast(msg, type) {
    var toast = document.getElementById('dueToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'dueToast';
        toast.className = 'nlh-due-toast';
        document.body.appendChild(toast);
    }
    toast.className = 'nlh-due-toast nlh-due-' + type + ' show';
    toast.textContent = msg;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function() {
        toast.classList.remove('show');
    }, 5000);
}

function sendBrowserNotif(title, body) {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
        new Notification(title, { body: body, icon: 'logo.png' });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function(p) {
            if (p === 'granted') new Notification(title, { body: body, icon: 'logo.png' });
        });
    }
}

// Chạy kiểm tra mỗi 30 giây
document.addEventListener('DOMContentLoaded', function() {
    if (Notification && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    setInterval(checkDueTasks, 30000);
    checkDueTasks(); // chạy ngay khi load
});

// ==============================
// ========= BIỂU ĐỒ ============
// ==============================

var CHART_COLORS = [
    '#4f46e5','#7c3aed','#a855f7','#ec4899','#f97316',
    '#22c55e','#0ea5e9','#f59e0b','#ef4444','#14b8a6'
];

var NOTE_COLOR_MAP = {
    yellow: { label: '🟡 Vàng',  hex: '#f59e0b' },
    blue:   { label: '🔵 Xanh',  hex: '#3b82f6' },
    green:  { label: '🟢 Lá',    hex: '#22c55e' },
    pink:   { label: '🩷 Hồng',  hex: '#ec4899' },
    purple: { label: '🟣 Tím',   hex: '#a855f7' }
};

function renderCharts() {
    renderChartSubjects();
    renderChartDailyTasks();
    renderChartHeatmap();
    renderChartDonut();
    renderChartNoteColors();
}

// 1. Môn học từ TKB tuần hiện tại
function renderChartSubjects() {
    var el = document.getElementById('chartSubjects');
    if (!el) return;
    var key = tkbGetWeekKey(0);
    var data = loadData(key, {});
    var counts = {};
    Object.values(data).forEach(function(val) {
        var v = (val || '').trim();
        if (!v || v === '—') return;
        counts[v] = (counts[v] || 0) + 1;
    });
    var entries = Object.entries(counts).sort(function(a,b){ return b[1]-a[1]; }).slice(0, 8);
    if (!entries.length) {
        el.innerHTML = '<div class="nlh-chart-empty">Chưa có dữ liệu TKB. Hãy điền thời khóa biểu trước.</div>';
        return;
    }
    var max = entries[0][1];
    el.innerHTML = entries.map(function(e, i) {
        var pct = Math.round(e[1] / max * 100);
        var color = CHART_COLORS[i % CHART_COLORS.length];
        return '<div class="nlh-bar-row">' +
            '<span class="nlh-bar-label" title="' + e[0] + '">' + e[0] + '</span>' +
            '<div class="nlh-bar-track"><div class="nlh-bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
            '<span class="nlh-bar-val">' + e[1] + '</span>' +
        '</div>';
    }).join('');
}

// 2. Lịch học theo ngày trong tháng hiện tại
function renderChartDailyTasks() {
    var el = document.getElementById('chartDailyTasks');
    if (!el) return;
    var now = new Date();
    var y = now.getFullYear(), m = now.getMonth();
    var days = new Date(y, m+1, 0).getDate();
    var dayNames = ['CN','T2','T3','T4','T5','T6','T7'];
    var counts = {};
    for (var d = 1; d <= days; d++) {
        var key = y + '-' + pad2(m+1) + '-' + pad2(d);
        counts[key] = (tasks[key] || []).length;
    }
    var entries = Object.entries(counts).filter(function(e){ return e[1] > 0; })
        .sort(function(a,b){ return a[0].localeCompare(b[0]); }).slice(0, 10);
    if (!entries.length) {
        el.innerHTML = '<div class="nlh-chart-empty">Chưa có lịch học nào trong tháng này.</div>';
        return;
    }
    var max = Math.max.apply(null, entries.map(function(e){ return e[1]; }));
    el.innerHTML = entries.map(function(e, i) {
        var parts = e[0].split('-');
        var date = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));
        var label = parts[2] + '/' + parts[1] + ' ' + dayNames[date.getDay()];
        var pct = Math.round(e[1] / max * 100);
        var color = CHART_COLORS[i % CHART_COLORS.length];
        return '<div class="nlh-bar-row">' +
            '<span class="nlh-bar-label">' + label + '</span>' +
            '<div class="nlh-bar-track"><div class="nlh-bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
            '<span class="nlh-bar-val">' + e[1] + '</span>' +
        '</div>';
    }).join('');
}

// 3. Heatmap tháng
function renderChartHeatmap() {
    var el = document.getElementById('chartHeatmap');
    if (!el) return;
    var now = new Date();
    var y = now.getFullYear(), m = now.getMonth();
    var days = new Date(y, m+1, 0).getDate();
    var todayStr = y + '-' + pad2(m+1) + '-' + pad2(now.getDate());
    var html = '';
    for (var d = 1; d <= days; d++) {
        var key = y + '-' + pad2(m+1) + '-' + pad2(d);
        var count = (tasks[key] || []).length;
        var cls = 'nlh-hm-day ';
        if (count === 0) cls += 'hm-empty';
        else if (count === 1) cls += 'hm-1';
        else if (count === 2) cls += 'hm-2';
        else if (count === 3) cls += 'hm-3';
        else if (count === 4) cls += 'hm-4';
        else cls += 'hm-5plus';
        if (key === todayStr) cls += ' hm-today';
        html += '<div class="' + cls + '" title="' + d + '/' + (m+1) + ': ' + count + ' lịch học">' + d + '</div>';
    }
    html += '<div class="nlh-hm-legend">' +
        '<span>Ít</span>' +
        '<div class="nlh-hm-legend-box" style="background:#e0e7ff"></div>' +
        '<div class="nlh-hm-legend-box" style="background:#a5b4fc"></div>' +
        '<div class="nlh-hm-legend-box" style="background:#818cf8"></div>' +
        '<div class="nlh-hm-legend-box" style="background:linear-gradient(135deg,#4f46e5,#7c3aed)"></div>' +
        '<span>Nhiều</span>' +
    '</div>';
    el.innerHTML = html;
}

// 4. Donut tỉ lệ hoàn thành
function renderChartDonut() {
    var fill = document.getElementById('donutFill');
    var label = document.getElementById('donutLabel');
    var doneEl = document.getElementById('donutDone');
    var todoEl = document.getElementById('donutTodo');
    if (!fill) return;
    var total = 0, done = 0;
    Object.values(tasks).forEach(function(arr) {
        (arr || []).forEach(function(t) {
            total++;
            if (t.done) done++;
        });
    });
    var pct = total > 0 ? Math.round(done / total * 100) : 0;
    var CIRC = 301.6;
    fill.style.strokeDashoffset = CIRC - (CIRC * pct / 100);
    if (label) label.textContent = pct + '%';
    if (doneEl) doneEl.textContent = done;
    if (todoEl) todoEl.textContent = total - done;
}

// 5. Ghi chú theo màu
function renderChartNoteColors() {
    var el = document.getElementById('chartNoteColors');
    if (!el) return;
    var counts = {};
    notes.forEach(function(n) { counts[n.color] = (counts[n.color] || 0) + 1; });
    var entries = Object.entries(counts).sort(function(a,b){ return b[1]-a[1]; });
    if (!entries.length) {
        el.innerHTML = '<div class="nlh-chart-empty">Chưa có ghi chú nào.</div>';
        return;
    }
    var max = entries[0][1];
    el.innerHTML = entries.map(function(e) {
        var info = NOTE_COLOR_MAP[e[0]] || { label: e[0], hex: '#aaa' };
        var pct = Math.round(e[1] / max * 100);
        return '<div class="nlh-cc-row">' +
            '<div class="nlh-cc-dot" style="background:' + info.hex + '"></div>' +
            '<span class="nlh-cc-label">' + info.label + '</span>' +
            '<div class="nlh-cc-track"><div class="nlh-cc-fill" style="width:' + pct + '%;background:' + info.hex + '"></div></div>' +
            '<span class="nlh-cc-val">' + e[1] + '</span>' +
        '</div>';
    }).join('');
}

// Hook vào switchTab để render khi mở tab chart
var _origSwitchTab2 = switchTab;
switchTab = function(tab) {
    _origSwitchTab2(tab);
    if (tab === 'chart') renderCharts();
};

// ==============================
// ===== WAVE TIMELINE ==========
// ==============================

var TASK_COLORS_HEX = {
    blue:   ['#3b82f6','#1d4ed8'],
    green:  ['#22c55e','#15803d'],
    red:    ['#ef4444','#b91c1c'],
    orange: ['#f97316','#c2410c'],
    purple: ['#a855f7','#7e22ce']
};

var PX_PER_MIN = 1.5; // 1 phút = 1.5px → 24h = 2160px

function renderWaveTimeline() {
    var wrap = document.getElementById('waveWrap');
    var inner = document.getElementById('waveInner');
    if (!wrap || !inner || !selectedDate) return;

    var dayTasks = tasks[selectedDate] || [];
    wrap.style.display = 'block';

    var totalW = 24 * 60 * PX_PER_MIN;
    inner.style.minWidth = totalW + 'px';

    var html = '';

    // Wave SVG decoration
    var wavePoints = '';
    for (var wx = 0; wx <= totalW; wx += 40) {
        var wy = 9 + Math.sin(wx / 120) * 6;
        wavePoints += (wx === 0 ? 'M' : 'L') + wx + ',' + wy + ' ';
    }
    html += '<svg class="nlh-wave-svg" style="width:' + totalW + 'px" viewBox="0 0 ' + totalW + ' 18" preserveAspectRatio="none">' +
        '<path d="' + wavePoints + '" fill="none" stroke="#4f46e5" stroke-width="3"/>' +
        '</svg>';

    // Hour grid
    for (var h = 0; h <= 24; h++) {
        var x = h * 60 * PX_PER_MIN;
        html += '<div class="nlh-wave-hour" style="left:' + x + 'px"></div>';
        if (h < 24) {
            var lbl = h < 10 ? '0' + h + ':00' : h + ':00';
            html += '<div class="nlh-wave-hour-label" style="left:' + x + 'px">' + lbl + '</div>';
        }
    }

    // Current time line (chỉ hiện nếu là hôm nay)
    var now = new Date();
    var todayKey = now.getFullYear() + '-' + pad2(now.getMonth()+1) + '-' + pad2(now.getDate());
    if (selectedDate === todayKey) {
        var nowMins = now.getHours() * 60 + now.getMinutes();
        var nowX = nowMins * PX_PER_MIN;
        var nowLbl = pad2(now.getHours()) + ':' + pad2(now.getMinutes());
        html += '<div class="nlh-wave-now" style="left:' + nowX + 'px">' +
            '<span class="nlh-wave-now-label">' + nowLbl + '</span>' +
        '</div>';
    }

    // Task blocks (có giờ)
    var noTimeTasks = [];
    dayTasks.forEach(function(t) {
        if (!t.timeStart) { noTimeTasks.push(t); return; }
        var startParts = t.timeStart.split(':');
        var startMins = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
        var endMins = startMins + 60; // default 1h
        if (t.timeEnd) {
            var ep = t.timeEnd.split(':');
            endMins = parseInt(ep[0]) * 60 + parseInt(ep[1]);
        }
        if (endMins <= startMins) endMins = startMins + 45;
        var blockX = startMins * PX_PER_MIN;
        var blockW = Math.max((endMins - startMins) * PX_PER_MIN, 48);
        var colors = TASK_COLORS_HEX[t.color] || TASK_COLORS_HEX.blue;
        var timeStr = t.timeStart + (t.timeEnd ? ' – ' + t.timeEnd : '');
        var taskIdx = dayTasks.indexOf(t);
        html += '<div class="nlh-wave-block' + (t.done ? ' done-block' : '') + '" ' +
            'style="left:' + blockX + 'px;width:' + blockW + 'px;background:linear-gradient(135deg,' + colors[0] + ',' + colors[1] + ')" ' +
            'title="' + t.subject + ' | ' + timeStr + '" ' +
            'onclick="openWaveDetail(' + taskIdx + ')">' +
            '<div class="nlh-wave-block-name">' + t.subject + '</div>' +
            '<div class="nlh-wave-block-time">' + timeStr + '</div>' +
        '</div>';
    });

    // No-time tasks strip
    if (noTimeTasks.length) {
        html += '<div class="nlh-wave-notime">';
        noTimeTasks.forEach(function(t) {
            html += '<span class="nlh-wave-notime-chip">' + t.subject + '</span>';
        });
        html += '</div>';
    }

    inner.innerHTML = html;

    // Scroll đến giờ hiện tại nếu là hôm nay
    var scroll = document.getElementById('waveScroll');
    if (scroll) {
        if (selectedDate === todayKey) {
            var nowMins2 = now.getHours() * 60 + now.getMinutes();
            var scrollTo = Math.max(0, nowMins2 * PX_PER_MIN - 200);
            setTimeout(function(){ scroll.scrollLeft = scrollTo; }, 80);
        } else {
            scroll.scrollLeft = 0;
        }
        initWaveDrag(scroll);
    }
}

// Drag to scroll
function initWaveDrag(el) {
    if (el._waveDragInit) return;
    el._waveDragInit = true;
    var isDown = false, startX, scrollLeft;
    el.addEventListener('mousedown', function(e) {
        isDown = true;
        el.classList.add('grabbing');
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
    });
    el.addEventListener('mouseleave', function() { isDown = false; el.classList.remove('grabbing'); });
    el.addEventListener('mouseup', function() { isDown = false; el.classList.remove('grabbing'); });
    el.addEventListener('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - el.offsetLeft;
        el.scrollLeft = scrollLeft - (x - startX);
    });
}

// Hook vào renderTasks để cập nhật wave
var _origRenderTasks = renderTasks;
renderTasks = function() {
    _origRenderTasks();
    renderWaveTimeline();
};

// ==============================
// ===== WAVE DETAIL MODAL ======
// ==============================
var waveDetailIdx = -1;

function openWaveDetail(idx) {
    var dayTasks = tasks[selectedDate] || [];
    var t = dayTasks[idx];
    if (!t) return;
    waveDetailIdx = idx;

    // Header gradient theo màu task
    var colors = TASK_COLORS_HEX[t.color] || TASK_COLORS_HEX.blue;
    var header = document.getElementById('waveDetailHeader');
    if (header) header.style.background = 'linear-gradient(135deg,' + colors[0] + ',' + colors[1] + ')';

    document.getElementById('waveDetailTitle').textContent = t.subject;
    document.getElementById('wdSubject').textContent = t.subject;

    // Thời gian
    var timeStr = '—';
    if (t.timeStart) timeStr = t.timeStart + (t.timeEnd ? ' → ' + t.timeEnd : '');
    document.getElementById('wdTime').textContent = timeStr;

    // Thời lượng
    var durStr = '—';
    if (t.timeStart && t.timeEnd) {
        var sp = t.timeStart.split(':'), ep = t.timeEnd.split(':');
        var mins = (parseInt(ep[0])*60 + parseInt(ep[1])) - (parseInt(sp[0])*60 + parseInt(sp[1]));
        if (mins > 0) {
            var h = Math.floor(mins/60), m = mins % 60;
            durStr = (h ? h + ' giờ ' : '') + (m ? m + ' phút' : '');
        }
    }
    document.getElementById('wdDuration').textContent = durStr;

    // Ngày
    if (selectedDate) {
        var parts = selectedDate.split('-');
        document.getElementById('wdDate').textContent =
            'Thứ ' + getDayName(new Date(selectedDate).getDay()) +
            ', ' + parseInt(parts[2]) + '/' + parseInt(parts[1]) + '/' + parts[0];
    }

    // Trạng thái
    var statusEl = document.getElementById('wdStatus');
    var btnEl = document.getElementById('wdToggleBtn');
    if (t.done) {
        statusEl.textContent = '✅ Đã hoàn thành';
        statusEl.style.color = '#22c55e';
        if (btnEl) btnEl.textContent = '↩ Đánh dấu chưa xong';
    } else {
        statusEl.textContent = '⏳ Chưa hoàn thành';
        statusEl.style.color = '#f59e0b';
        if (btnEl) btnEl.textContent = '✓ Đánh dấu xong';
    }

    document.getElementById('waveDetailModal').style.display = 'flex';
}

function closeWaveDetail() {
    document.getElementById('waveDetailModal').style.display = 'none';
    waveDetailIdx = -1;
}

function wdToggleDone() {
    if (waveDetailIdx < 0 || !selectedDate) return;
    var dayTasks = tasks[selectedDate] || [];
    if (!dayTasks[waveDetailIdx]) return;
    dayTasks[waveDetailIdx].done = !dayTasks[waveDetailIdx].done;
    saveData('nlh_tasks', tasks);
    closeWaveDetail();
    renderTasks(); // cũng re-render wave
}

function getDayName(d) {
    return ['CN','2','3','4','5','6','7'][d];
}

// ==============================
// ===== WAVE DETAIL EDIT =======
// ==============================
var wdEditColor = 'blue';

function switchToEditMode() {
    var dayTasks = tasks[selectedDate] || [];
    var t = dayTasks[waveDetailIdx];
    if (!t) return;

    // Điền sẵn giá trị hiện tại
    document.getElementById('wdEditSubject').value = t.subject || '';
    document.getElementById('wdEditTimeStart').value = t.timeStart || '';
    document.getElementById('wdEditTimeEnd').value = t.timeEnd || '';
    wdEditColor = t.color || 'blue';
    document.querySelectorAll('#wdEditColorRow .nlh-color-dot').forEach(function(d) {
        d.classList.toggle('active', d.dataset.color === wdEditColor);
    });

    document.getElementById('wdViewBody').style.display = 'none';
    document.getElementById('wdViewFooter').style.display = 'none';
    document.getElementById('wdEditBody').style.display = 'flex';
    document.getElementById('wdEditFooter').style.display = 'flex';
    document.getElementById('wdEditSubject').focus();
}

function switchToViewMode() {
    document.getElementById('wdEditBody').style.display = 'none';
    document.getElementById('wdEditFooter').style.display = 'none';
    document.getElementById('wdViewBody').style.display = 'flex';
    document.getElementById('wdViewFooter').style.display = 'flex';
}

function selectWdColor(color, el) {
    wdEditColor = color;
    document.querySelectorAll('#wdEditColorRow .nlh-color-dot').forEach(function(d) {
        d.classList.remove('active');
    });
    el.classList.add('active');
}

function wdSaveEdit() {
    var subject = document.getElementById('wdEditSubject').value.trim();
    if (!subject) { document.getElementById('wdEditSubject').focus(); return; }
    var dayTasks = tasks[selectedDate] || [];
    if (!dayTasks[waveDetailIdx]) return;

    dayTasks[waveDetailIdx].subject   = subject;
    dayTasks[waveDetailIdx].timeStart = document.getElementById('wdEditTimeStart').value;
    dayTasks[waveDetailIdx].timeEnd   = document.getElementById('wdEditTimeEnd').value;
    dayTasks[waveDetailIdx].color     = wdEditColor;
    saveData('nlh_tasks', tasks);

    closeWaveDetail();
    renderTasks();
}

function wdDeleteTask() {
    epConfirm('Xóa lịch học?', 'Lịch học này sẽ bị xóa vĩnh viễn.', { okText: '🗑️ Xóa', cancelText: 'Hủy' }).then(function(ok) {
        if (!ok) return;
        var dayTasks = tasks[selectedDate] || [];
        dayTasks.splice(waveDetailIdx, 1);
        saveData('nlh_tasks', tasks);
        closeWaveDetail();
        renderTasks();
        renderCalendar();
        epToast('Đã xóa lịch học', 'success');
    });
}
