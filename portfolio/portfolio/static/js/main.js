(function () {
    'use strict';

    var root = document.documentElement;

    /* ---------- Theme toggle (light / dark, remembered per visitor) ---------- */
    var toggle = document.getElementById('theme-toggle');
    var media = window.matchMedia('(prefers-color-scheme: dark)');

    function currentTheme() {
        return root.dataset.theme || (media.matches ? 'dark' : 'light');
    }
    function syncToggleLabel() {
        if (!toggle) return;
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    }
    if (toggle) {
        toggle.addEventListener('click', function () {
            var next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.dataset.theme = next;
            try { localStorage.setItem('gih-theme', next); } catch (e) {}
            syncToggleLabel();
        });
        syncToggleLabel();
        if (media.addEventListener) media.addEventListener('change', syncToggleLabel);
    }

    /* ---------- Top app bar: elevate on scroll ---------- */
    var bar = document.getElementById('top-app-bar');
    function onScroll() {
        if (bar) bar.classList.toggle('is-scrolled', window.scrollY > 4);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Modal navigation drawer ---------- */
    var drawer = document.getElementById('nav-drawer');
    var openBtn = document.getElementById('drawer-open');
    var closeBtn = document.getElementById('drawer-close');

    if (drawer && typeof drawer.showModal === 'function') {
        openBtn && openBtn.addEventListener('click', function () { drawer.showModal(); });
        closeBtn && closeBtn.addEventListener('click', function () { drawer.close(); });
        // Click on the scrim (outside the drawer panel) closes it
        drawer.addEventListener('click', function (e) {
            var r = drawer.getBoundingClientRect();
            var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
            if (!inside) drawer.close();
        });
        drawer.querySelectorAll('[data-close-drawer]').forEach(function (a) {
            a.addEventListener('click', function () { drawer.close(); });
        });
        // Close the drawer if the window grows to desktop width
        window.matchMedia('(min-width: 960px)').addEventListener('change', function (e) {
            if (e.matches && drawer.open) drawer.close();
        });
    } else if (openBtn) {
        // Very old browsers: hide the menu button; the footer still links every page
        openBtn.hidden = true;
    }

    /* ---------- Scroll reveal ---------- */
    var items = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('is-visible'); });
        return;
    }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    // Stagger siblings in the same grid slightly
    items.forEach(function (el) {
        var siblings = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.hasAttribute('data-reveal'); }) : [];
        var index = siblings.indexOf(el);
        if (index > 0) el.style.transitionDelay = Math.min(index, 5) * 70 + 'ms';
        io.observe(el);
    });
})();
