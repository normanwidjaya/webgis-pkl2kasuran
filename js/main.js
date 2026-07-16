/**
 * WebGIS Dusun Kasuran - Main JavaScript v2
 * 
 * Tab system untuk 5 Peta Dasar + 5 Peta Tematik,
 * galeri dinamis, slider, lightbox, counter, dll.
 */

document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initNavbar();
    initMobileMenu();
    initActiveNavOnScroll();
    initStatCounters();
    initTabSystem();
    initCompareSlider();
    initGallery();
    initLightbox();
    initScrollToTop();
    initSmoothScroll();
    updateDemografiDisplay();
});

// ==================== AOS ====================
function initAOS() { if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true, offset: 100, easing: 'ease-out-cubic' }); }

// ==================== NAVBAR ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navMenu.classList.toggle('active'); });
    navMenu.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { hamburger.classList.remove('active'); navMenu.classList.remove('active'); }));
}

function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => { if (window.scrollY + 120 >= s.offsetTop && window.scrollY + 120 < s.offsetTop + s.offsetHeight) current = s.id; });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
    });
}

// ==================== STAT COUNTERS ====================
function initStatCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target, parseInt(e.target.dataset.target)); observer.unobserve(e.target); } });
        }, { threshold: 0.5 });
        observer.observe(el);
    });
}

function animateCounter(el, target) {
    if (!target) { el.textContent = '0'; return; }
    const duration = 2000, start = performance.now();
    function update(t) { const p = Math.min((t - start) / duration, 1), v = Math.floor((1 - Math.pow(1 - p, 3)) * target); el.textContent = v.toLocaleString('id-ID'); if (p < 1) requestAnimationFrame(update); else el.textContent = target.toLocaleString('id-ID'); }
    requestAnimationFrame(update);
}

function updateDemografiDisplay() {
    const d = DUSUN_DATA.demografi;
    const setTarget = (id, val) => { const el = document.getElementById(id); if (el) el.setAttribute('data-target', val); };
    setTarget('populasi', d.populasi);
    setTarget('bangunan', d.bangunan);
    setTarget('luas', Math.round(d.luasHektar));
    setTarget('umkmCount', DUSUN_DATA.umkm.total);
}

// ==================== TAB SYSTEM ====================
function initTabSystem() {
    document.querySelectorAll('.map-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            const tabGroup = this.parentElement;
            const tabContent = tabGroup.nextElementSibling;
            if (!tabContent || !tabContent.classList.contains('map-tab-content')) return;

            // Deactivate all tabs in group
            tabGroup.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Hide all panels
            tabContent.querySelectorAll('.map-panel').forEach(p => p.classList.remove('active'));

            // Show target panel
            const targetId = this.dataset.tab;
            const targetPanel = tabContent.querySelector('#' + targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
                // Init mini map if needed
                const mapEl = targetPanel.querySelector('.map-panel-map');
                if (mapEl && mapEl.id && !miniMaps[mapEl.id]) {
                    initMiniMap(mapEl.id);
                } else if (mapEl && mapEl.id) {
                    refreshMiniMap(mapEl.id);
                }
            }
        });
    });
}

// ==================== COMPARE SLIDER ====================
function initCompareSlider() {
    const container = document.getElementById('compareContainer');
    const slider = document.getElementById('compareSlider');
    const after = document.querySelector('.compare-after');
    if (!container || !slider || !after) return;

    let dragging = false;
    function setPos(x) {
        const rect = container.getBoundingClientRect();
        let pos = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
        after.style.width = (pos * 100) + '%';
        slider.style.left = (pos * 100) + '%';
        const img = after.querySelector('img');
        if (img) img.style.transform = `translateX(-${(100 - pos * 100)}%)`;
    }

    slider.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
    slider.addEventListener('touchstart', e => { dragging = true; e.preventDefault(); });
    container.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
    container.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mouseup', () => dragging = false);
    document.addEventListener('touchend', () => dragging = false);
    container.addEventListener('click', e => { if (!e.target.closest('.compare-slider')) setPos(e.clientX); });
}

// ==================== GALLERY ====================
function initGallery() {
    const grid = document.getElementById('galeriGrid');
    const placeholder = document.getElementById('galeriPlaceholder');
    if (!grid) return;

    grid.innerHTML = '';
    DUSUN_DATA.galeri.forEach(item => {
        const div = document.createElement('div');
        div.className = 'galeri-item';
        div.innerHTML = `
            <img src="${item.src}" alt="${item.caption}" loading="lazy" onerror="this.parentElement.style.display='none'">
            <div class="galeri-overlay"><span class="galeri-category">${item.category}</span><h4>${item.caption}</h4></div>
        `;
        grid.appendChild(div);
    });

    // Show/hide placeholder
    const hasImages = grid.querySelectorAll('img:not([style*="display:none"])').length > 0;
    if (placeholder) placeholder.style.display = hasImages ? 'none' : 'block';
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    document.addEventListener('click', e => {
        const item = e.target.closest('.galeri-item');
        if (!item) return;
        const el = item.querySelector('img');
        if (!el || el.style.display === 'none') return;
        lightbox.classList.add('active'); img.src = el.src; img.alt = el.alt;
        const h4 = item.querySelector('h4'); if (h4) caption.textContent = h4.textContent;
        document.body.style.overflow = 'hidden';
    });

    document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) { lb.classList.remove('active'); document.body.style.overflow = ''; }
}

// ==================== SCROLL TO TOP ====================
function initScrollToTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top'; btn.innerHTML = '<i class="fas fa-arrow-up"></i>'; btn.setAttribute('aria-label', 'Kembali ke atas');
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
            const target = document.querySelector(id);
            if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' }); }
        });
    });
}

console.log('🌍 WebGIS Dusun Kasuran v2 — 5 Peta Dasar + 5 Peta Tematik — Ready');
