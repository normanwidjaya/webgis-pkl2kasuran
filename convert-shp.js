/**
 * Optimized shapefile to GeoJSON converter
 * - Reduces coordinate precision to 6 decimal places
 * - Strips unnecessary properties
 */
const shapefile = require('shapefile');
const fs = require('fs');
const path = require('path');

const SHP_DIR = 'C:\\Users\\Shiroko\\Downloads\\WebGIS\\Data WebGIS';
const OUT_DIR = path.join(__dirname, 'data');

function reducePrecision(coord, decimals = 6) {
    const factor = Math.pow(10, decimals);
    if (Array.isArray(coord)) {
        if (typeof coord[0] === 'number') {
            return [Math.round(coord[0] * factor) / factor, Math.round(coord[1] * factor) / factor];
        }
        return coord.map(c => reducePrecision(c, decimals));
    }
    return coord;
}

const propKeep = {
    batas_kasuran: ['NAMOBJ', 'DUSUN', 'Toponimi', 'WADMKD', 'WADMKC', 'WADMKK'],
    jalan_desa: ['Kelas', 'Toponimi', 'Sub_Unsur'],
    batas_sumberarum: ['NAMOBJ', 'DUSUN', 'Toponimi', 'WADMKD'],
    batas_desa_magelang: ['NAMOBJ', 'WADMKD', 'WADMKC', 'WADMKK', 'KDEPUM'],
    batas_magelang: ['NAME_2', 'NAME_1', 'TYPE_2'],
    batas_magelang_sekitar: ['NAMOBJ', 'WADMKK', 'WADMPR', 'TIPADM'],
};

const shapefiles = [
    { dir: 'Batas_Admin_Kasuran\\Batas_Admin_Kasuran', file: 'Batas_Dusun_Desa_Kasuran', name: 'batas_kasuran', label: 'Batas Dusun Kasuran', group: 'Batas' },
    { dir: 'Jalan_Desa_Final\\Jalan_Desa_Final', file: 'Jalan_Desa_Sumber_Arum', name: 'jalan_desa', label: 'Jalan Desa Sumberarum', group: 'Transportasi' },
    { dir: 'Data_Layout\\Data_Layout\\Petunjuk Letak Peta', file: 'Batas_Dusun_Desa_Sumberarum', name: 'batas_sumberarum', label: 'Batas Dusun Sumberarum', group: 'Batas' },
    { dir: 'Data_Layout\\Data_Layout\\Petunjuk Letak Peta', file: 'BatasAdmin_Desa_Magelang', name: 'batas_desa_magelang', label: 'Batas Desa Magelang', group: 'Batas' },
    { dir: 'Data_Layout\\Data_Layout\\Data Peta Utama', file: 'BatasAdmin_Magelang', name: 'batas_magelang', label: 'Batas Kab. Magelang', group: 'Batas' },
    { dir: 'Data_Layout\\Data_Layout\\Diagram Lokasi', file: 'BatasAdmin_Magelang_Sekitarnya', name: 'batas_magelang_sekitar', label: 'Batas Sekitar Magelang', group: 'Batas' },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function stripProps(feature, keepKeys) {
    if (!keepKeys || !feature.properties) return feature;
    const newProps = {};
    for (const k of keepKeys) {
        if (feature.properties[k] !== undefined) newProps[k] = feature.properties[k];
    }
    feature.properties = newProps;
    return feature;
}

async function convertAll() {
    const layers = [];

    for (const shp of shapefiles) {
        const shpPath = path.join(SHP_DIR, shp.dir, shp.file + '.shp');
        console.log(`Converting: ${shp.file}...`);

        try {
            const geojson = await shapefile.read(shpPath);
            geojson.features = geojson.features.map(f => {
                f.geometry.coordinates = reducePrecision(f.geometry.coordinates, 6);
                return stripProps(f, propKeep[shp.name]);
            });

            const fileName = `${shp.name}.geojson`;
            fs.writeFileSync(path.join(OUT_DIR, fileName), JSON.stringify(geojson), 'utf8');
            const sizeKB = (fs.statSync(path.join(OUT_DIR, fileName)).size / 1024).toFixed(1);
            console.log(`  -> ${geojson.features.length} features, ${sizeKB} KB`);

            layers.push({
                name: shp.name,
                label: shp.label,
                group: shp.group,
                type: geojson.features[0]?.geometry?.type || 'unknown',
                file: fileName,
                featureCount: geojson.features.length,
            });
        } catch (err) {
            console.error(`  FAILED: ${err.message}`);
        }
    }

    fs.writeFileSync(path.join(OUT_DIR, 'layers.json'), JSON.stringify(layers, null, 2), 'utf8');
    console.log('\nDone! Optimized GeoJSON in data/');
}

convertAll().catch(console.error);
