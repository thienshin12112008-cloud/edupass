/* ============================================
   EDUPASS POPUP SYSTEM
   epAlert / epConfirm / epPrompt
   Thay thế hoàn toàn alert() confirm() prompt()
   ============================================ */
(function () {
    'use strict';

    var ICONS = {
        info:    'ℹ️',
        success: '✅',
        warning: '⚠️',
        error:   '❌',
        confirm: '❓',
        prompt:  '✏️'
    };

    function createOverlay() {
        var el = document.createElement('div');
        el.className = 'ep-popup-overlay';
        return el;
    }

    function createPopup(type, title, msg, opts) {
        opts = opts || {};
        var icon = opts.icon || ICONS[type] || 'ℹ️';

        var popup = document.createElement('div');
        popup.className = 'ep-popup';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-modal', 'true');

        var inputHtml = '';
        if (type === 'prompt') {
            inputHtml = '<div class="ep-popup-input-wrap">' +
                '<input class="ep-popup-input" id="epPromptInput" type="text" ' +
                'placeholder="' + (opts.placeholder || '') + '" ' +
                'value="' + (opts.defaultValue || '') + '" autocomplete="off">' +
                '</div>';
        }

        var cancelHtml = '';
        if (type === 'confirm' || type === 'prompt') {
            cancelHtml = '<button class="ep-popup-btn ep-popup-btn-cancel" id="epBtnCancel">' +
                (opts.cancelText || 'Hủy') + '</button>';
        }

        popup.innerHTML =
            '<div class="ep-popup-header">' +
                '<div class="ep-popup-icon ' + type + '">' + icon + '</div>' +
                '<div class="ep-popup-titles">' +
                    '<div class="ep-popup-title">' + (title || '') + '</div>' +
                    (msg ? '<p class="ep-popup-msg">' + msg + '</p>' : '') +
                '</div>' +
            '</div>' +
            (inputHtml ? '<div class="ep-popup-divider"></div>' + inputHtml : '') +
            '<div class="ep-popup-divider"></div>' +
            '<div class="ep-popup-footer">' +
                cancelHtml +
                '<button class="ep-popup-btn ep-popup-btn-ok ' + type + '" id="epBtnOk">' +
                    (opts.okText || 'OK') +
                '</button>' +
            '</div>';

        return popup;
    }

    /* ── epAlert ── */
    window.epAlert = function (title, msg, type, opts) {
        if (typeof msg === 'object') { opts = msg; msg = ''; }
        type = type || 'info';
        return new Promise(function (resolve) {
            var overlay = createOverlay();
            var popup   = createPopup(type, title, msg, opts);
            overlay.appendChild(popup);
            document.body.appendChild(overlay);

            var btnOk = popup.querySelector('#epBtnOk');
            function close() {
                overlay.style.animation = 'epPopupFadeIn .15s ease reverse';
                setTimeout(function () { overlay.remove(); resolve(); }, 140);
            }
            btnOk.addEventListener('click', close);
            overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
            document.addEventListener('keydown', function esc(e) {
                if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
            });
            btnOk.focus();
        });
    };

    /* ── epConfirm ── */
    window.epConfirm = function (title, msg, opts) {
        return new Promise(function (resolve) {
            var overlay = createOverlay();
            var popup   = createPopup('confirm', title, msg, opts);
            overlay.appendChild(popup);
            document.body.appendChild(overlay);

            function close(result) {
                overlay.style.animation = 'epPopupFadeIn .15s ease reverse';
                setTimeout(function () { overlay.remove(); resolve(result); }, 140);
            }
            popup.querySelector('#epBtnOk').addEventListener('click', function () { close(true); });
            popup.querySelector('#epBtnCancel').addEventListener('click', function () { close(false); });
            overlay.addEventListener('click', function (e) { if (e.target === overlay) close(false); });
            document.addEventListener('keydown', function esc(e) {
                if (e.key === 'Escape') { close(false); document.removeEventListener('keydown', esc); }
                if (e.key === 'Enter')  { close(true);  document.removeEventListener('keydown', esc); }
            });
            popup.querySelector('#epBtnOk').focus();
        });
    };

    /* ── epPrompt ── */
    window.epPrompt = function (title, msg, opts) {
        return new Promise(function (resolve) {
            var overlay = createOverlay();
            var popup   = createPopup('prompt', title, msg, opts);
            overlay.appendChild(popup);
            document.body.appendChild(overlay);

            var input = popup.querySelector('#epPromptInput');
            function close(result) {
                overlay.style.animation = 'epPopupFadeIn .15s ease reverse';
                setTimeout(function () { overlay.remove(); resolve(result); }, 140);
            }
            popup.querySelector('#epBtnOk').addEventListener('click', function () { close(input.value); });
            popup.querySelector('#epBtnCancel').addEventListener('click', function () { close(null); });
            overlay.addEventListener('click', function (e) { if (e.target === overlay) close(null); });
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') close(input.value);
                if (e.key === 'Escape') close(null);
            });
            document.addEventListener('keydown', function esc(e) {
                if (e.key === 'Escape') { close(null); document.removeEventListener('keydown', esc); }
            });
            setTimeout(function () { input.focus(); input.select(); }, 50);
        });
    };

    /* ── Override native alert/confirm/prompt ── */
    window.alert = function (msg) {
        epAlert(msg || '', '', 'info');
    };
    window.confirm = function (msg) {
        // Sync confirm không thể async — trả về true để không block,
        // dùng epConfirm() trực tiếp trong code thay thế
        epConfirm(msg || '');
        return true;
    };

    /* ── Toast nhẹ (không cần action) ── */
    window.epToast = function (msg, type, duration) {
        type = type || 'info';
        duration = duration || 3000;
        var colors = {
            info:    'linear-gradient(135deg,#4f46e5,#7c3aed)',
            success: 'linear-gradient(135deg,#16a34a,#22c55e)',
            warning: 'linear-gradient(135deg,#d97706,#f59e0b)',
            error:   'linear-gradient(135deg,#dc2626,#ef4444)'
        };
        var toast = document.createElement('div');
        toast.style.cssText =
            'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%) translateY(0);' +
            'background:' + (colors[type] || colors.info) + ';color:#fff;' +
            'padding:.65rem 1.4rem;border-radius:30px;font-size:.88rem;font-weight:700;' +
            'box-shadow:0 6px 24px rgba(0,0,0,.2);z-index:99999;' +
            'animation:epToastIn .3s cubic-bezier(.22,.68,0,1.2);' +
            'white-space:nowrap;max-width:90vw;text-align:center;';
        toast.textContent = msg;

        var style = document.createElement('style');
        style.textContent =
            '@keyframes epToastIn{from{opacity:0;transform:translateX(-50%) translateY(16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
        document.head.appendChild(style);
        document.body.appendChild(toast);

        setTimeout(function () {
            toast.style.transition = 'opacity .3s, transform .3s';
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(12px)';
            setTimeout(function () { toast.remove(); style.remove(); }, 300);
        }, duration);
    };

})();
