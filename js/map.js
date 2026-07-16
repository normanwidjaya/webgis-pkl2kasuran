/**
 * WebGIS Dusun Kasuran - Map Module v2
 * 
 * Peta interaktif utama + mini map per tab peta dasar/tematik
 */

let mainMap = null;
let miniMaps = {};
let geoLayers = {};

// ==================== PETA INTERAKTIF UTAMA ====================
function initMainMap() {
    const mapEl = document.getElementById('map-interaktif');
    if (!mapEl) return;

    mainMap = L.map('map-interaktif', {
        center: DUSUN_DATA.center,
        zoom: DUSUN_DATA.zoom,
        zoomControl: true,
        scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OSM | WebGIS Dusun Kasuran',
        maxZoom: 19,
    }).addTo(mainMap);

    L.control.scale({ imperial: false, metric: true, position: 'bottomleft' }).addTo(mainMap);

    const marker = L.marker(DUSUN_DATA.center, {
        icon: L.divIcon({
            className: '',
            html: `<div style="width:28px;height:28px;background:#e74c3c;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 10px rgba(0,0,0,.3)"></div>`,
            iconSize: [28, 28], iconAnchor: [14, 14],
        })
    }).addTo(mainMap);
    marker.bindPopup('<div style="text-align:center;padding:6px;"><strong>📍 Dusun Kasuran</strong><br><small>RW 17, Desa Sumberarum</small></div>').openPopup();

    L.circle(DUSUN_DATA.center, {
        radius: 500, color: '#e74c3c', fillColor: '#e74c3c', fillOpacity: 0.06, weight: 2, dashArray: '5,10'
    }).addTo(mainMap).bindPopup('Area sekitar (±500m)');

    // Layer toggles dari checkbox
    document.querySelectorAll('.legend-check input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', function () {
            const id = this.dataset.layer;
            if (geoLayers[id]) {
                this.checked ? mainMap.addLayer(geoLayers[id]) : mainMap.removeLayer(geoLayers[id]);
            }
        });
    });

    setTimeout(() => mainMap.invalidateSize(), 400);
}

function addGeoJSONToMain(config, data) {
    if (!mainMap) return;
    try {
        const layer = L.geoJSON(data, {
            style: { color: config.color, weight: config.weight, fillColor: config.color, fillOpacity: config.fillOpacity },
            onEachFeature: (f, l) => {
                if (f.properties) {
                    let h = '<div style="min-width:140px;">';
                    Object.entries(f.properties).forEach(([k, v]) => { h += `<strong>${k}:</strong> ${v}<br>`; });
                    h += '</div>'; l.bindPopup(h);
                }
            }
        });
        if (config.visible) layer.addTo(mainMap);
        geoLayers[config.id] = layer;
    } catch (e) { console.warn('Gagal load layer:', config.name, e); }
}

// ==================== MINI MAP PER TAB ====================
function initMiniMap(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';

    const m = L.map(el, {
        center: DUSUN_DATA.center,
        zoom: 15,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: true,
        attributionControl: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(m);

    L.marker(DUSUN_DATA.center, {
        icon: L.divIcon({
            className: '',
            html: `<div style="width:20px;height:20px;background:#e74c3c;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 6px rgba(0,0,0,.3)"></div>`,
            iconSize: [20, 20], iconAnchor: [10, 10],
        })
    }).addTo(m).bindPopup('Dusun Kasuran');

    miniMaps[containerId] = m;
    setTimeout(() => m.invalidateSize(), 300);
}

function initVisibleMiniMaps() {
    document.querySelectorAll('.map-panel.active .map-panel-map').forEach(panel => {
        if (panel.id && !miniMaps[panel.id]) initMiniMap(panel.id);
    });
}

function refreshMiniMap(id) {
    if (miniMaps[id]) setTimeout(() => miniMaps[id].invalidateSize(), 200);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    initMainMap();
    initVisibleMiniMaps();
});
window.addEventListener('resize', () => {
    if (mainMap) setTimeout(() => mainMap.invalidateSize(), 200);
    Object.values(miniMaps).forEach(m => setTimeout(() => m.invalidateSize(), 200));
});
