// src/storage.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lokasi file JSON tempat menyimpan data
const DATA_PATH = path.resolve(__dirname, '../students.json');

export function loadStudentsFromFile() {
  try {
    if (!fs.existsSync(DATA_PATH)) return [];
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStudentsToFile(studentsArray) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(studentsArray, null, 2), 'utf-8');
  } catch (err) {
    console.error('Gagal menyimpan data:', err.message);
  }
}

export { DATA_PATH };
