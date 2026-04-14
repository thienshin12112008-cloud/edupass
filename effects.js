/* ============================================
   EDUPASS GLOBAL EFFECTS
   ============================================ */
(function () {
    'use strict';

    /* ── 1. PAGE TRANSITION ── */
    function initPageTransition() {
        var overlay = document.createElement('div');
        overlay.id = 'ep-transition';
        overlay.innerHTML = '<img src="logo.png" alt="EduPass" id="ep-transition-logo">';
        document.body.appendChild(overlay);

        // Fade in on load
        overlay.classList.add('ep-in');
        setTimeout(function () { overlay.classList.remove('ep-in'); }, 500);

        // Intercept internal links
        document.addEventListener('click', function (e) {
            var a = e.target.closest('a');
            if (!a) return;
            var href = a.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto') ||
                href.startsWith('tel') || href.startsWith('javascript') ||
                a.target === '_blank' || e.ctrlKey || e.metaKey) return;
            if (href.match(/^https?:\/\//) && !href.includes(location.hostname)) return;
            e.preventDefault();
            overlay.classList.add('ep-out');
            setTimeout(function () { window.location.href = href; }, 420);
        });
    }

    /* ── 2. SCROLL REVEAL ── */
    function initScrollReveal() {
        var targets = document.querySelectorAll(
            '.eco-stack-card, .dt-intro-card, .nlh-timer-card, .nlh-chart-card, ' +
            '.footer-col, .nlh-stat-box, .nlh-music-card, .nlh-study-stats, ' +
            '.dt-card, .nlh-calendar-wrap, .nlh-tasks-wrap, .nlh-wave-wrap, ' +
            '.tkb-wrap, .nlh-notes-sidebar, .nlh-notes-editor'
        );
        targets.forEach(function (el, i) {
            // Bỏ qua nếu nằm trong chatbot hoặc eco sections (có animation riêng)
            if (el.closest('.ai-chat-window, .ai-greeting-bubble, #aiChatWindow, #aiGreetingBubble')) return;
            if (el.closest('.nlh-eco-section, .dt-eco-section')) return;
            el.classList.add('ep-reveal');
            el.classList.add('ep-d' + Math.min((i % 6) + 1, 6));
        });

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ep-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        targets.forEach(function (el) {
            if (el.classList.contains('ep-reveal')) io.observe(el);
        });
    }

    /* ── 3. CURSOR TRAIL ── */
    var TRAIL_COLORS = ['#4f46e5','#7c3aed','#a855f7','#ec4899','#f97316','#22c55e','#0ea5e9'];
    var trailPool = [];
    var trailIdx = 0;
    var POOL_SIZE = 18;

    function initCursorTrail() {
        for (var i = 0; i < POOL_SIZE; i++) {
            var dot = document.createElement('div');
            dot.className = 'ep-cursor-dot';
            dot.style.opacity = '0';
            document.body.appendChild(dot);
            trailPool.push({ el: dot, x: 0, y: 0, life: 0 });
        }

        document.addEventListener('mousemove', function (e) {
            var p = trailPool[trailIdx % POOL_SIZE];
            trailIdx++;
            var color = TRAIL_COLORS[trailIdx % TRAIL_COLORS.length];
            var size = 6 + Math.random() * 6;
            p.el.style.cssText =
                'left:' + e.clientX + 'px;top:' + e.clientY + 'px;' +
                'width:' + size + 'px;height:' + size + 'px;' +
                'background:' + color + ';opacity:.75;' +
                'transition:opacity .5s,transform .5s;transform:translate(-50%,-50%) scale(1)';
            clearTimeout(p._t);
            p._t = setTimeout(function () {
                p.el.style.opacity = '0';
                p.el.style.transform = 'translate(-50%,-50%) scale(0)';
            }, 80);
        });
    }

    /* ── 4. CLICK RIPPLE ── */
    function initClickRipple() {
        document.addEventListener('click', function (e) {
            var ripple = document.createElement('div');
            ripple.className = 'ep-ripple';
            var size = 60 + Math.random() * 60;
            var color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
            ripple.style.cssText =
                'left:' + e.clientX + 'px;top:' + e.clientY + 'px;' +
                'width:' + size + 'px;height:' + size + 'px;' +
                'background:' + color + ';opacity:.35;';
            document.body.appendChild(ripple);
            setTimeout(function () { ripple.remove(); }, 700);
        });
    }

    /* ── 5. FLOATING PARTICLES ── */
    function initParticles() {
        var canvas = document.createElement('canvas');
        canvas.id = 'ep-particles';
        document.body.insertBefore(canvas, document.body.firstChild);
        var ctx = canvas.getContext('2d');
        var W, H, particles = [];
        var COLORS = ['#4f46e5','#7c3aed','#a855f7','#c4b5fd','#818cf8'];

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        for (var i = 0; i < 38; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: 1.5 + Math.random() * 3,
                dx: (Math.random() - .5) * .4,
                dy: -.15 - Math.random() * .35,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                alpha: .15 + Math.random() * .35
            });
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(function (p) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
                if (p.x < -10) p.x = W + 10;
                if (p.x > W + 10) p.x = -10;
            });
            ctx.globalAlpha = 1;
            requestAnimationFrame(draw);
        }
        draw();
    }

    /* ── 6. CARD TILT ── */
    function initCardTilt() {
        var cards = document.querySelectorAll(
            '.eco-stack-card, .dt-intro-card, .nlh-timer-card, .nlh-chart-card, .nlh-stat-box'
        );
        cards.forEach(function (card) {
            card.classList.add('ep-tilt');
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var cx = rect.left + rect.width / 2;
                var cy = rect.top + rect.height / 2;
                var rx = ((e.clientY - cy) / rect.height) * 10;
                var ry = ((e.clientX - cx) / rect.width) * -10;
                card.style.transform = 'perspective(600px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale(1.02)';
                card.style.boxShadow = '0 16px 40px rgba(79,70,229,.18)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }

    /* ── 7. FLOATING ORBS on headers ── */
    function initOrbs() {
        var headers = document.querySelectorAll(
            '.nlh-header, .dt-header, .hero-section'
        );
        var orbColors = [
            ['#818cf8','120px'], ['#a78bfa','90px'],
            ['#f0abfc','100px'], ['#67e8f9','80px']
        ];
        headers.forEach(function (h) {
            // Bỏ qua chatbot elements
            if (h.closest('.ai-chat-window, .ai-greeting-bubble, .ai-chat-header')) return;
            var pos = getComputedStyle(h).position;
            if (pos === 'static') h.style.position = 'relative';
            h.style.overflow = 'hidden';
            orbColors.forEach(function (oc, i) {
                var orb = document.createElement('div');
                orb.className = 'ep-orb';
                orb.style.cssText =
                    'width:' + oc[1] + ';height:' + oc[1] + ';' +
                    'background:' + oc[0] + ';' +
                    'top:' + (-20 + i * 25) + '%;' +
                    'left:' + (10 + i * 22) + '%;' +
                    'animation-delay:' + (i * 1.8) + 's;';
                h.appendChild(orb);
            });
        });
    }

    /* ── INIT ── */
    function init() {
        initPageTransition();
        initScrollReveal();
        initCursorTrail();
        initClickRipple();
        initParticles();
        initCardTilt();
        initOrbs();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
