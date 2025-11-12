Sistem Manajemen Nilai Siswa (Challenge 4 – WPH Bootcamp)

Aplikasi CLI (Command Line Interface) berbasis JavaScript OOP untuk mengelola data siswa, nilai mata pelajaran, serta status kelulusan.
Didesain dengan pendekatan Object-Oriented Programming dan memiliki fitur CRUD lengkap serta data persistence (file JSON) agar data tetap tersimpan setelah program ditutup.

Fitur Utama
No	Fitur	Deskripsi
1	Tambah Siswa Baru	Input ID, nama, kelas → buat data baru
2	Lihat Semua Siswa	Menampilkan daftar seluruh siswa beserta nilai dan status
3	Cari Siswa (by ID)	Menampilkan informasi satu siswa berdasarkan ID unik
4	Update Data Siswa	Mengubah nama atau kelas siswa
5	Hapus Siswa	Menghapus data berdasarkan ID
6	Tambah Nilai Siswa	Menambahkan mata pelajaran dan nilai (0 – 100)
7	Lihat Top 3 Siswa	Menampilkan 3 siswa dengan rata-rata tertinggi
8	Keluar	Mengakhiri program

Fitur Bonus: Persistence (JSON)

Setiap perubahan data (tambah, update, hapus, tambah nilai) disimpan otomatis ke file:

students.json


Ketika program dijalankan kembali, seluruh data akan otomatis dimuat dari file tersebut.
Contoh isi file JSON:

[
  {
    "id": "002",
    "name": "Yulia",
    "class": "10C",
    "grades": {
      "Matematika": 90,
      "IPA": 85
    }
  }
]

Struktur Project
challenge-4-Purwita165-1/
│
├── index.js                   # Main CLI interface
├── package.json               # Project config & dependencies
├── students.json              # Data persistence file
└── src/
    ├── Student.js             # Class Student (data & logic nilai)
    ├── StudentManager.js      # Class StudentManager (CRUD)
    └── storage.js             # Modul simpan/muat file JSON

Cara Menjalankan

1. Install dependency

npm install


2. Jalankan program

node index.js


(atau npm start jika sudah ditambahkan ke scripts)

3. Interaksi melalui terminal

=================================
SISTEM MANAJEMEN NILAI SISWA
=================================
1. Tambah Siswa Baru
2. Lihat Semua Siswa
3. Cari Siswa
4. Update Data Siswa
5. Hapus Siswa
6. Tambah Nilai Siswa
7. Lihat Top 3 Siswa
8. Keluar
=================================

Contoh Output
--- Tambah Siswa Baru ---
Masukkan ID Siswa: 001
Masukkan Nama Siswa: Jono
Masukkan Kelas (contoh: 10A): 10C
--> Siswa berhasil ditambahkan!

--- Tambah Nilai Siswa ---
Masukkan ID Siswa: 001
Mata Pelajaran: Matematika
Nilai (0-100): 90
--> Nilai berhasil ditambahkan!

--- Daftar Semua Siswa ---
ID: 001
Nama: Jono
Kelas: 10C
Mata Pelajaran:
  - Matematika: 90
Rata-rata: 90
Status: Lulus
------------------------

Konsep OOP yang Diterapkan
Konsep	Implementasi
Class	Student, StudentManager
Encapsulation	Akses data siswa melalui method, bukan langsung
Inheritance	— (tidak diperlukan pada skop ini)
Method Responsibility	Setiap class punya tanggung jawab terpisah
Error Handling	Validasi input dan penanganan error informativ

Dependencies

readline-sync → Input interaktif di terminal

fs (core module) → Membaca & menulis file JSON

Kontributor

Purwita Musaffa
WPH Bootcamp – Challenge 4: Sistem Manajemen Nilai Siswa

🏁 Status Proyek

✅ Selesai 100%
✅ Fitur bonus (persistence JSON) diimplementasikan