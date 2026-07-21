/**
 * WebGIS Dusun Kasuran — Main JS v3 (2026)
 * Dynamic rendering dari data.js untuk 10 peta + interaktivitas
 */

document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initNavbar();
    initMobileMenu();
    initActiveNavOnScroll();
    initStatCounters();
    renderPetaTabs('dasar');
    renderPetaTabs('tematik');
    initTabSystem();
    initPetaLokasi();
    initGallery();
    initLightbox();
    initScrollToTop();
    initSmoothScroll();
    updateDemografiDisplay();
});

// ==================== AOS ====================
function initAOS() { if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true, offset: 100, easing: 'ease-out-cubic' }); }

// ==================== NAVBAR ====================
function initNavbar() { const n = document.getElementById('navbar'); if (n) window.addEventListener('scroll', () => n.classList.toggle('scrolled', window.scrollY > 50)); }
function initMobileMenu() {
    const h = document.getElementById('hamburger'), m = document.getElementById('navMenu');
    if (!h || !m) return;
    h.addEventListener('click', () => { h.classList.toggle('active'); m.classList.toggle('active'); });
    m.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => { h.classList.remove('active'); m.classList.remove('active'); }));
}
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]'), links = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let cur = '';
        sections.forEach(s => { if (window.scrollY + 120 >= s.offsetTop && window.scrollY + 120 < s.offsetTop + s.offsetHeight) cur = s.id; });
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
    });
}

// ==================== STAT COUNTERS ====================
function initStatCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const obs = new IntersectionObserver((e) => { e.forEach(x => { if (x.isIntersecting) { animateCounter(x.target, parseInt(x.target.dataset.target)); obs.unobserve(x.target); } }); }, { threshold: 0.5 });
        obs.observe(el);
    });
}
function animateCounter(el, tgt) {
    if (!tgt) { el.textContent = '0'; return; }
    const d = 2000, s = performance.now();
    function up(ts) { const p = Math.min((ts - s) / d, 1), v = Math.floor((1 - Math.pow(1 - p, 3)) * tgt); el.textContent = v.toLocaleString('id-ID'); if (p < 1) requestAnimationFrame(up); else el.textContent = tgt.toLocaleString('id-ID'); }
    requestAnimationFrame(up);
}
function updateDemografiDisplay() {
    const d = DUSUN_DATA.demografi;
    ['populasi','bangunan','luas','umkmCount'].forEach((id,i) => { const el = document.getElementById(id); if (el) el.setAttribute('data-target', [d.populasi_2026||0, d.bangunan_2026||119, Math.round(d.luasHektar), DUSUN_DATA.bangunan2026.total||119][i]); });
}

// ==================== DYNAMIC RENDER PETA TABS ====================
function renderPetaTabs(type) {
    const data = type === 'dasar' ? DUSUN_DATA.petaDasar : DUSUN_DATA.petaTematik;
    const tabsContainer = document.getElementById(type === 'dasar' ? 'tabsDasar' : 'tabsTematik');
    const contentContainer = document.getElementById(type === 'dasar' ? 'contentDasar' : 'contentTematik');
    if (!tabsContainer || !contentContainer) return;

    tabsContainer.innerHTML = '';
    contentContainer.innerHTML = '';

    data.forEach((peta, idx) => {
        // Tab button
        const btn = document.createElement('button');
        btn.className = 'map-tab' + (idx === 0 ? ' active' : '');
        btn.dataset.tab = peta.tabId;
        const ico = peta.icon || 'fa-map';
        btn.innerHTML = `<i class="fas ${ico}"></i><span>${peta.name}</span>`;
        tabsContainer.appendChild(btn);

        // Panel content
        const panel = document.createElement('div');
        panel.className = 'map-panel' + (idx === 0 ? ' active' : '');
        panel.id = peta.tabId;
        panel.innerHTML = buildPanelHTML(peta, type);
        contentContainer.appendChild(panel);
    });
}

function buildPanelHTML(peta, type) {
    const statsHTML = peta.stats ? peta.stats.map(s => `<div class="map-stat"><span class="map-stat-num">${s.value}</span><span>${s.label}</span></div>`).join('') : '';

    // Chart bars (Penggunaan Lahan)
    const chartHTML = peta.chartBars ? `<div class="map-chart-bars">${peta.chartBars.map(b => `<div class="chart-bar-item"><span class="chart-bar-label">${b.label}</span><div class="chart-bar-track"><div class="chart-bar-fill" style="width:${b.pct}%;background:${b.color}"></div></div><span class="chart-bar-pct">${b.pct}%</span></div>`).join('')}</div>` : '';

    // RT cards
    const rtHTML = peta.rtDetail ? `<div class="rt-cards">${peta.rtDetail.map(r => `<div class="rt-card"><span class="rt-badge" style="background:${r.warna}">${r.nama}</span><p>${r.deskripsi}</p></div>`).join('')}</div>` : '';

    // Jenis Usaha
    const jenisHTML = peta.jenisUsaha ? `<div class="sektor-grid">${peta.jenisUsaha.map(j => `<div class="sektor-card" style="border-left-color:${j.warna};background:${j.warna}11"><i class="fas ${j.icon}" style="color:${j.warna}"></i><strong>${j.nama}</strong><span>${j.contoh}</span></div>`).join('')}</div>` : '';

    // Fungsi Bangunan
    const fungsiHTML = peta.fungsiList ? `<div class="map-chart-bars">${peta.fungsiList.map(f => `<div class="chart-bar-item"><span class="chart-bar-label">${f.fungsi}</span><div class="chart-bar-track"><div class="chart-bar-fill" style="width:${Math.min((f.jumlah/119)*100, 100)}%;background:${f.warna}"></div></div><span class="chart-bar-pct">${f.jumlah}</span></div>`).join('')}</div>` : '';

    // Populasi per RT + Gender
    const totalPop = peta.populasiPerRT ? parseInt(peta.populasiPerRT.rt01)+parseInt(peta.populasiPerRT.rt02)+parseInt(peta.populasiPerRT.rt03) : 0;
    const popHTML = peta.populasiPerRT ? `<div class="internet-grid">
        ${['rt01','rt02','rt03'].map(rt => {
            const pop = peta.populasiPerRT[rt] || '0';
            const g = peta.genderPerRT?.[rt] || {laki:0,perempuan:0};
            return `<div class="internet-card"><i class="fas fa-users"></i><strong>${rt.toUpperCase().replace('RT0','RT 0')}</strong><div class="internet-bar"><div class="internet-fill" style="width:${Math.min((parseInt(pop)/totalPop)*100,100)}%"></div></div><span class="data-pending">${pop}</span><span style="font-size:.7rem;color:var(--gray-500);">♂ ${g.laki} | ♀ ${g.perempuan}</span></div>`;
        }).join('')}
    </div>${peta.populasiPerRT.note ? `<p class="map-note">📋 ${peta.populasiPerRT.note}</p>` : ''}` : '';

    // Akses Internet
    const inetHTML = peta.kategoriAkses ? `<div style="margin-bottom:14px;"><h4 style="font-size:.8rem;color:var(--gray-700);">Kategori Akses:</h4>${peta.kategoriAkses.map(k => `<span class="legend-dot" style="background:${k.warna};display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:4px;"></span> ${k.level}`).join(' &nbsp;|&nbsp; ')}</div><div class="internet-grid">${['rt01','rt02','rt03'].map(rt => {
        const d = peta.dataPerRT?.[rt] || {};
        const pct = parseFloat(d.persen) || 0;
        const warna = pct >= 70 ? '#2ecc71' : pct >= 50 ? '#f39c12' : '#e74c3c';
        return `<div class="internet-card"><i class="fas fa-wifi"></i><strong>${rt.toUpperCase().replace('RT0','RT 0')}</strong><div class="internet-bar"><div class="internet-fill" style="width:${pct}%;background:${warna}"></div></div><span style="font-weight:700;color:${warna};">${d.fiber || '—'}</span><span style="font-size:.7rem;color:var(--gray-500);">${d.mobile || ''}</span></div>`;
    }).join('')}</div>` : '';

    // Pendidikan
    const pendHTML = peta.jenjangPendidikan ? `<div class="pendidikan-table-wrapper"><table class="pendidikan-table">
        <thead><tr><th>Jenjang</th><th>RT 01</th><th>RT 02</th><th>RT 03</th><th>Total</th></tr></thead>
        <tbody>${['tidakSekolah','sd','smp','sma','pt'].map((k,i) => {
            const label = peta.jenjangPendidikan[i];
            const d = peta.dataPerRT || {};
            const v1 = d.rt01?.[k] ?? '—', v2 = d.rt02?.[k] ?? '—', v3 = d.rt03?.[k] ?? '—';
            const total = (typeof v1==='number'&&typeof v2==='number'&&typeof v3==='number') ? v1+v2+v3 : '—';
            return `<tr><td>${label}</td><td>${v1 !== null ? v1 : '—'}</td><td>${v2 !== null ? v2 : '—'}</td><td>${v3 !== null ? v3 : '—'}</td><td><strong>${total}</strong></td></tr>`;
        }).join('')}
        <tr class="total-row"><td><strong>Total Populasi</strong></td><td><strong>124</strong></td><td><strong>70</strong></td><td><strong>126</strong></td><td><strong>320</strong></td></tr></tbody>
    </table></div><p class="map-note">📋 Data jenjang pendidikan per RT — dari Peta Tingkat Pendidikan (2026)</p>` : '';

    // Tahun badge
    const tahunBadge = peta.tahun ? `<span style="display:inline-block;background:var(--primary);color:#fff;padding:2px 10px;border-radius:12px;font-size:0.7rem;margin-left:8px;vertical-align:middle;">${peta.tahun}</span>` : '';

    // Gambar peta (JPG hasil konversi dari PDF)
    const imgPath = `assets/images/peta/${peta.tabId}`;
    // Mapping tabId ke nama file JPG
    const imgMap = {
        'd-1': 'd-1-foto-udara.jpg', 'd-2': 'd-2-bangunan.jpg', 'd-3': 'd-3-batas-admin.jpg',
        'd-4': 'd-4-sarpras.jpg', 'd-5': 'd-5-penggunaan-lahan.jpg',
        't-1': 't-1-jenis-usaha.jpg', 't-2': 't-2-fungsi-bangunan.jpg', 't-3': 't-3-jumlah-penduduk.jpg',
        't-4': 't-4-akses-internet.jpg', 't-5': 't-5-pendidikan.jpg',
    };
    const imgFile = imgMap[peta.tabId] || `${peta.tabId}.jpg`;
    const imgFullPath = `assets/images/peta/${imgFile}`;

    return `<div class="map-panel-grid">
        <div class="map-panel-info">
            <h3><i class="fas ${peta.icon || 'fa-map'}"></i> ${peta.name}${tahunBadge}</h3>
            <p>${peta.desc}</p>
            ${statsHTML ? `<div class="map-stats-row">${statsHTML}</div>` : ''}
            ${chartHTML}${jenisHTML}${fungsiHTML}${rtHTML}${popHTML}${inetHTML}${pendHTML}
        </div>
        <div class="map-panel-map">
            <img src="${imgFullPath}" alt="${peta.name}" class="peta-image"
                 onerror="this.parentElement.innerHTML='<div class=\\'map-panel-placeholder\\'><i class=\\'fas fa-map\\'></i><p>Gambar peta belum tersedia</p></div>'"
                 onclick="this.classList.toggle('zoomed')" title="Klik untuk zoom">
        </div>
    </div>`;
}

// ==================== TAB SYSTEM ====================
function initTabSystem() {
    document.querySelectorAll('.map-tabs').forEach(tabGroup => {
        tabGroup.addEventListener('click', function (e) {
            const tab = e.target.closest('.map-tab');
            if (!tab) return;
            const contentContainer = this.nextElementSibling;
            if (!contentContainer) return;

            this.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            contentContainer.querySelectorAll('.map-panel').forEach(p => p.classList.remove('active'));

            const targetPanel = contentContainer.querySelector('#' + tab.dataset.tab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// ==================== COMPARE SLIDER ====================
function initCompareSlider() {
    const c = document.getElementById('compareContainer'), s = document.getElementById('compareSlider'), a = document.querySelector('.compare-after');
    if (!c || !s || !a) return;
    let d = false;
    function pos(x) { const r = c.getBoundingClientRect(), p = Math.max(0, Math.min(1, (x - r.left) / r.width)); a.style.width = (p * 100) + '%'; s.style.left = (p * 100) + '%'; const im = a.querySelector('img'); if (im) im.style.transform = `translateX(-${(100 - p * 100)}%)`; }
    s.addEventListener('mousedown', e => { d = true; e.preventDefault(); });
    s.addEventListener('touchstart', e => { d = true; e.preventDefault(); });
    c.addEventListener('mousemove', e => { if (d) pos(e.clientX); });
    c.addEventListener('touchmove', e => { if (d) pos(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mouseup', () => d = false);
    document.addEventListener('touchend', () => d = false);
    c.addEventListener('click', e => { if (!e.target.closest('.compare-slider')) pos(e.clientX); });
}

// ==================== PETA LOKASI (BERANDA) ====================
function initPetaLokasi() {
    const mapEl = document.getElementById('mapLokasi');
    if (!mapEl) return;

    const map = L.map('mapLokasi', {
        center: DUSUN_DATA.center,
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        doubleClickZoom: true,
        touchZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org">OSM</a> | WebGIS Dusun Kasuran',
        maxZoom: 19,
    }).addTo(map);

    L.control.scale({ imperial: false, metric: true, position: 'bottomright' }).addTo(map);

    // Ensure map renders correctly when container becomes visible
    map.whenReady(function() {
        setTimeout(function() { map.invalidateSize(); }, 200);
    });

    // IntersectionObserver: invalidate size when section scrolls into view
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    setTimeout(function() { map.invalidateSize(); }, 100);
                }
            });
        }, { threshold: [0, 0.5, 1] });
        obs.observe(mapEl);
    }

    // Also on window resize and tab visibility
    window.addEventListener('resize', function() { map.invalidateSize(); });

    // Marker pusat dusun
    L.marker(DUSUN_DATA.center, {
        icon: L.divIcon({
            className: '',
            html: '<div style="width:24px;height:24px;background:#e74c3c;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.3);"></div>',
            iconSize: [24, 24], iconAnchor: [12, 12],
        })
    }).addTo(map).bindPopup('<strong>Dusun Kasuran</strong><br>RW 17, Desa Sumberarum');

    // Load GeoJSON layers
    var layers = [
        { file: 'data/batas_kasuran.geojson', style: { color: '#2d6a4f', weight: 3, fillColor: '#52b788', fillOpacity: 0.2 } },
        { file: 'data/batas_sumberarum.geojson', style: { color: '#e67e22', weight: 2, fillColor: '#f39c12', fillOpacity: 0.1, dashArray: '6 3' } },
        { file: 'data/jalan_desa.geojson', styleFn: function(f) {
            var k = f.properties.Kelas;
            if (k === '1') return { color: '#e74c3c', weight: 3, opacity: 0.9 };
            if (k === '2') return { color: '#f39c12', weight: 2.5, opacity: 0.85 };
            return { color: '#95a5a6', weight: 1.5, opacity: 0.7, dashArray: '5 3' };
        }},
    ];

    var allBounds = null;
    var loadedCount = 0;

    layers.forEach(function(layerCfg) {
        fetch(layerCfg.file)
            .then(function(r) { return r.json(); })
            .then(function(geojson) {
                var opts = {
                    onEachFeature: function(f, l) {
                        if (f.properties) {
                            var map={NAMOBJ:'Nama',WADMKD:'Desa',WADMKC:'Kecamatan',WADMKK:'Kabupaten',WADMPR:'Provinsi',DUSUN:'Dusun',Toponimi:'Toponimi',Kelas:'Kelas Jalan',RT:'RT',Jenis:'Jenis',Nama:'Nama',Shape_Area:'Luas',Shape_Length:'Panjang'};
                            var skip=['SRS_ID','METADATA','KDCPUM','KDPPUM','FCODE','KDEPUM','KDPKAB','KDPPUM','Shape_Le_1','Shape_Leng','KET_DETAIL','KET_PL'];
                            var h='<div class="popup-card"><div class="popup-title" style="font-weight:700;color:#2d6a4f;font-size:.85rem;padding-bottom:5px;margin-bottom:5px;border-bottom:2px solid rgba(45,106,79,.15)">Info</div><table style="width:100%">';
                            Object.entries(f.properties).slice(0,10).forEach(function(e){
                                if(skip.includes(e[0])||e[1]===null||e[1]==='')return;
                                var label=map[e[0]]||e[0].replace(/_/g,' ');
                                h+='<tr><td style="color:#999;font-size:.7rem;padding-right:8px;white-space:nowrap">'+label+'</td><td style="font-weight:600">'+e[1]+'</td></tr>';
                            });
                            h+='</table></div>';l.bindPopup(h,{maxWidth:260});
                        }
                    }
                };
                if (layerCfg.styleFn) opts.style = layerCfg.styleFn;
                else opts.style = layerCfg.style;

                var lg = L.geoJSON(geojson, opts).addTo(map);
                var b = lg.getBounds();
                if (b.isValid()) {
                    if (!allBounds) allBounds = b; else allBounds.extend(b);
                }
                loadedCount++;
                if (loadedCount === layers.length && allBounds) {
                    map.fitBounds(allBounds, { padding: [40, 40] });
                }
            })
            .catch(function(e) { console.warn('Peta lokasi gagal load:', layerCfg.file, e); });
    });
}

// ==================== GALLERY & LIGHTBOX ====================
function initGallery() {
    const grid = document.getElementById('galeriGrid'), ph = document.getElementById('galeriPlaceholder');
    if (!grid) return;
    grid.innerHTML = '';
    DUSUN_DATA.galeri.forEach(item => {
        const div = document.createElement('div'); div.className = 'galeri-item';
        if (item.type === 'video') {
            div.innerHTML = `<video src="${item.src}" controls preload="metadata" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" onerror="this.parentElement.style.display='none'"></video><div class="galeri-overlay"><span class="galeri-category">${item.category}</span><h4>${item.caption}</h4></div>`;
        } else {
            div.innerHTML = `<img src="${item.src}" alt="${item.caption}" loading="lazy" onerror="this.parentElement.style.display='none'"><div class="galeri-overlay"><span class="galeri-category">${item.category}</span><h4>${item.caption}</h4></div>`;
        }
        grid.appendChild(div);
    });
    if (ph) ph.style.display = grid.querySelectorAll('img:not([style*="display:none"]), video:not([style*="display:none"])').length > 0 ? 'none' : 'block';
}

function initLightbox() {
    const lb = document.getElementById('lightbox'); if (!lb) return;
    const im = document.getElementById('lightboxImg'), cap = document.getElementById('lightboxCaption');
    document.addEventListener('click', e => {
        const item = e.target.closest('.galeri-item'); if (!item) return;
        const vid = item.querySelector('video'); if (vid) return; // Don't open lightbox for videos
        const el = item.querySelector('img'); if (!el || el.style.display === 'none') return;
        lb.classList.add('active'); im.src = el.src; im.alt = el.alt;
        const h4 = item.querySelector('h4'); if (h4) cap.textContent = h4.textContent;
        document.body.style.overflow = 'hidden';
    });
    document.getElementById('lightboxClose')?.addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
}
function closeLb() { const lb = document.getElementById('lightbox'); if (lb) { lb.classList.remove('active'); document.body.style.overflow = ''; } }

// ==================== SCROLL TO TOP ====================
function initScrollToTop() {
    const b = document.createElement('button'); b.className = 'scroll-top'; b.innerHTML = '<i class="fas fa-arrow-up"></i>'; b.setAttribute('aria-label', 'Kembali ke atas');
    document.body.appendChild(b);
    window.addEventListener('scroll', () => b.classList.toggle('visible', window.scrollY > 500));
    b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        const t = document.querySelector(id);
        if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' }); }
    }));
}

console.log('🌍 WebGIS Dusun Kasuran v3 (2026) — 5 Peta Dasar + 5 Peta Tematik — Ready');
