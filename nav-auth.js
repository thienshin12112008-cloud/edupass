// nav-auth.js — cập nhật nav dựa trên trạng thái đăng nhập
(function () {
    function updateNav() {
        var isLoggedIn = localStorage.getItem('loggedIn');
        var user = {};
        try { user = JSON.parse(localStorage.getItem('user') || '{}'); } catch (e) {}
        var name = user.fullname || 'Tài khoản';

        document.querySelectorAll('.nav-actions').forEach(function (nav) {
            // Bỏ qua nav-actions đặc biệt (lam-bai-thi)
            if (nav.querySelector('a[href="tao-de-thi.html"]')) return;
            if (isLoggedIn) {
                nav.innerHTML =
                    '<a href="tai-khoan.html" class="btn-nav-login">👤 ' + name + '</a>' +
                    '<a href="#" onclick="localStorage.removeItem(\'loggedIn\');window.location.href=\'index.html\';return false;" class="btn-nav-register">Đăng xuất</a>';
            } else {
                nav.innerHTML =
                    '<a href="dang-nhap.html" class="btn-nav-login">Đăng nhập</a>' +
                    '<a href="dang-ky.html" class="btn-nav-register">Đăng ký</a>';
            }
        });

        // Mobile nav-mobile-only
        document.querySelectorAll('.nav-menu').forEach(function (menu) {
            menu.querySelectorAll('.nav-dynamic').forEach(function (el) { el.remove(); });
            if (isLoggedIn) {
                menu.querySelectorAll('.nav-mobile-only').forEach(function (el) { el.style.display = 'none'; });
                var li1 = document.createElement('li');
                li1.className = 'nav-dynamic';
                li1.innerHTML = '<a href="tai-khoan.html" style="display:block;text-align:center;padding:.5rem 1rem">👤 Tài khoản</a>';
                var li2 = document.createElement('li');
                li2.className = 'nav-dynamic';
                li2.innerHTML = '<a href="#" onclick="localStorage.removeItem(\'loggedIn\');window.location.href=\'index.html\';return false;" style="display:block;text-align:center;padding:.5rem 1rem">Đăng xuất</a>';
                menu.appendChild(li1);
                menu.appendChild(li2);
            } else {
                menu.querySelectorAll('.nav-mobile-only').forEach(function (el) { el.style.display = ''; });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateNav);
    } else {
        updateNav();
    }
})();
