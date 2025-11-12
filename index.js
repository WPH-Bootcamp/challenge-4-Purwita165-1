/**
 * Main Application - CLI Interface
 * Sistem Manajemen Nilai Siswa (Challenge 4 + Persistence JSON)
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';
import { loadStudentsFromFile, saveStudentsToFile } from './src/storage.js';

// Inisialisasi StudentManager dengan data dari file
const existingData = loadStudentsFromFile();
const manager = new StudentManager(existingData.map((data) => new Student(data)));

/**
 * Menyimpan data terbaru ke file JSON
 */
function saveData() {
  saveStudentsToFile(manager.getAllStudents().map((s) => s));
}

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 */
function addNewStudent() {
  console.log('\n--- Tambah Siswa Baru ---');
  const id = readlineSync.question('Masukkan ID Siswa: ').trim();
  const name = readlineSync.question('Masukkan Nama Siswa: ').trim();
  const className = readlineSync.question('Masukkan Kelas (contoh: 10A): ').trim();

  try {
    const newStudent = new Student({ id, name, class: className });
    manager.addStudent(newStudent);
    saveData(); // simpan ke JSON
    console.log('✅ Siswa berhasil ditambahkan!');
  } catch (err) {
    console.log('❌ Gagal menambah siswa:', err.message);
  }
}

/**
 * Handler untuk melihat semua siswa
 */
function viewAllStudents() {
  console.log('\n--- Daftar Semua Siswa ---');
  const all = manager.getAllStudents();
  if (all.length === 0) {
    console.log('Belum ada data siswa.');
  } else {
    console.log(manager.displayAllStudents());
  }
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 */
function searchStudent() {
  console.log('\n--- Cari Siswa ---');
  const id = readlineSync.question('Masukkan ID Siswa: ').trim();
  try {
    const st = manager.findStudent(id);
    console.log('\nData Siswa:\n');
    console.log(st.displayInfo());
  } catch (err) {
    console.log('❌', err.message);
  }
}

/**
 * Handler untuk update data siswa
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');
  const id = readlineSync.question('Masukkan ID Siswa: ').trim();
  try {
    const st = manager.findStudent(id);
    console.log('\nData Saat Ini:\n' + st.displayInfo());

    const newName = readlineSync.question('Nama Baru (kosongkan jika tidak diubah): ').trim();
    const newClass = readlineSync.question('Kelas Baru (kosongkan jika tidak diubah): ').trim();

    const data = {};
    if (newName) data.name = newName;
    if (newClass) data.class = newClass;

    manager.updateStudent(id, data);
    saveData(); // simpan ke JSON
    console.log('✅ Data siswa berhasil diupdate!');
  } catch (err) {
    console.log('❌', err.message);
  }
}

/**
 * Handler untuk menghapus siswa
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');
  const id = readlineSync.question('Masukkan ID Siswa: ').trim();
  const confirm = readlineSync.keyInYN(`Yakin ingin menghapus siswa dengan ID ${id}?`);
  if (!confirm) return console.log('Dibatalkan.');

  try {
    manager.removeStudent(id);
    saveData(); // simpan ke JSON
    console.log('✅ Siswa berhasil dihapus.');
  } catch (err) {
    console.log('❌', err.message);
  }
}

/**
 * Handler untuk menambah nilai siswa
 */
function addGradeToStudent() {
  console.log('\n--- Tambah Nilai Siswa ---');
  const id = readlineSync.question('Masukkan ID Siswa: ').trim();

  try {
    const st = manager.findStudent(id);
    console.log('\nData Siswa:\n' + st.displayInfo());

    const subject = readlineSync.question('Mata Pelajaran: ').trim();
    const score = parseFloat(readlineSync.question('Nilai (0-100): ').trim());
    st.addGrade(subject, score);
    saveData(); // simpan ke JSON
    console.log('✅ Nilai berhasil ditambahkan!');
  } catch (err) {
    console.log('❌', err.message);
  }
}

/**
 * Handler untuk melihat top students
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Siswa ---');
  const top = manager.getTopStudents(3);
  if (top.length === 0) {
    console.log('Belum ada data siswa.');
  } else {
    top.forEach((s, i) => {
      console.log(
        `${i + 1}. ${s.getName()} (${s.getClass()}) - Rata-rata: ${s.getAverage()} (${s.getGradeStatus()})`
      );
    });
  }
}

/**
 * Main program loop
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');
  let running = true;

  while (running) {
    displayMenu();
    const choice = readlineSync.question('Pilih menu (1-8): ').trim();

    switch (choice) {
      case '1': addNewStudent(); break;
      case '2': viewAllStudents(); break;
      case '3': searchStudent(); break;
      case '4': updateStudent(); break;
      case '5': deleteStudent(); break;
      case '6': addGradeToStudent(); break;
      case '7': viewTopStudents(); break;
      case '8':
        console.log('\nTerima kasih telah menggunakan aplikasi ini!');
        running = false;
        break;
      default:
        console.log('Pilihan tidak valid. Coba lagi.');
    }
  }
}

// Jalankan aplikasi
main();
