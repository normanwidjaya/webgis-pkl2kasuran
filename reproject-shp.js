/**
 * Reproject UTM shapefiles to WGS84 and write optimized GeoJSON
 */
const shapefile = require('shapefile');
const proj4 = require('proj4');
const fs = require('fs');
const path = require('path');

const SHP_DIR = 'C:\\Users\\Shiroko\\Downloads\\WebGIS\\Data WebGIS';
const OUT_DIR = path.join(__dirname, 'data');

// Define UTM Zone 49S (EPSG:32749) -> WGS84 (EPSG:4326)
proj4.defs('EPSG:32749', '+proj=utm +zone=49 +south +datum=WGS84 +units=m +no_defs');
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

const utmToWgs = proj4('EPSG:32749', 'EPSG:4326');

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

function isProjected(coords) {
    // If first coordinate value is > 180, it's projected (UTM meters)
    function check(c) {
        if (Array.isArray(c)) {
            if (typeof c[0] === 'number') return Math.abs(c[0]) > 180;
            return check(c[0]);
        }
        return false;
    }
    return check(coords);
}

function reprojectCoords(coords) {
    if (Array.isArray(coords)) {
        if (typeof coords[0] === 'number') {
            // [x, y] in UTM -> [lng, lat] in WGS84
            const result = utmToWgs.forward([coords[0], coords[1]]);
            return [result[0], result[1]];
        }
        return coords.map(c => reprojectCoords(c));
    }
    return coords;
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

            const needsReproject = isProjected(geojson.features[0]?.geometry?.coordinates);
            console.log(`  Reproject UTM->WGS84: ${needsReproject}`);

            geojson.features = geojson.features.map(f => {
                if (needsReproject) {
                    f.geometry.coordinates = reprojectCoords(f.geometry.coordinates);
                }
                f.geometry.coordinates = reducePrecision(f.geometry.coordinates, 6);
                return stripProps(f, propKeep[shp.name]);
            });

            const fileName = `${shp.name}.geojson`;
            fs.writeFileSync(path.join(OUT_DIR, fileName), JSON.stringify(geojson), 'utf8');
            const sizeKB = (fs.statSync(path.join(OUT_DIR, fileName)).size / 1024).toFixed(1);
            console.log(`  -> ${geojson.features.length} features, ${sizeKB} KB`);

            layers.push({
                name: shp.name, label: shp.label, group: shp.group,
                type: geojson.features[0]?.geometry?.type || 'unknown',
                file: fileName, featureCount: geojson.features.length,
            });
        } catch (err) {
            console.error(`  FAILED: ${err.message}`);
        }
    }

    fs.writeFileSync(path.join(OUT_DIR, 'layers.json'), JSON.stringify(layers, null, 2), 'utf8');
    console.log('\n✅ Done! Reprojected GeoJSON in data/');
}

convertAll().catch(console.error);
