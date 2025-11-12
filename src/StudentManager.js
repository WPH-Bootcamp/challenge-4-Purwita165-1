import Student from './Student.js';

class StudentManager {
  constructor() {
    // Gunakan Map agar ID unik dan pencarian cepat
    this.students = new Map();
  }

  /**
   * Menambah siswa baru ke dalam sistem
   * @param {Student} student - Object Student yang akan ditambahkan
   */
  addStudent(student) {
    const id = student.getId();
    if (this.students.has(id)) {
      throw new Error(`Siswa dengan ID ${id} sudah ada.`);
    }
    this.students.set(id, student);
  }

  /**
   * Menghapus siswa berdasarkan ID
   * @param {string} id - ID siswa yang akan dihapus
   * @returns {boolean} true jika berhasil
   */
  removeStudent(id) {
    const key = String(id).trim();
    if (!this.students.has(key)) {
      throw new Error(`Siswa dengan ID ${key} tidak ditemukan.`);
    }
    this.students.delete(key);
    return true;
  }

  /**
   * Mencari siswa berdasarkan ID
   * @param {string} id - ID siswa yang dicari
   * @returns {Student}
   */
  findStudent(id) {
    const key = String(id).trim();
    const st = this.students.get(key);
    if (!st) {
      throw new Error(`Siswa dengan ID ${key} tidak ditemukan.`);
    }
    return st;
  }

  /**
   * Update data siswa
   * @param {string} id
   * @param {object} data - Data baru (name, class, dll)
   */
  updateStudent(id, data) {
    const st = this.findStudent(id);
    if (data.name !== undefined && data.name.trim()) {
      st.setName(data.name);
    }
    if (data.class !== undefined && data.class.trim()) {
      st.setClass(data.class);
    }
    if (data.grades && typeof data.grades === 'object') {
      for (const [subj, score] of Object.entries(data.grades)) {
        st.addGrade(subj, score);
      }
    }
    return st;
  }

  /**
   * Mendapatkan semua siswa
   * @returns {Array<Student>}
   */
  getAllStudents() {
    return Array.from(this.students.values());
  }

  /**
   * Mendapatkan top n siswa berdasarkan rata-rata nilai
   * @param {number} n
   * @returns {Array<Student>}
   */
  getTopStudents(n) {
    return this.getAllStudents()
      .sort((a, b) => b.getAverage() - a.getAverage())
      .slice(0, n);
  }

  /**
   * Menampilkan informasi semua siswa
   * @returns {string}
   */
  displayAllStudents() {
    const list = this.getAllStudents();
    if (list.length === 0) return 'Belum ada data siswa.';
    return list
      .map(
        (s) => s.displayInfo() + '\n------------------------'
      )
      .join('\n');
  }

  /**
   * BONUS: Mendapatkan siswa berdasarkan kelas
   */
  getStudentsByClass(className) {
    return this.getAllStudents().filter(
      (s) => s.getClass() === className
    );
  }

  /**
   * BONUS: Statistik kelas
   */
  getClassStatistics(className) {
    const list = this.getStudentsByClass(className);
    if (list.length === 0) return { jumlahSiswa: 0, rataRataKelas: 0 };
    const avg =
      list.reduce((acc, s) => acc + s.getAverage(), 0) / list.length;
    return {
      jumlahSiswa: list.length,
      rataRataKelas: Number(avg.toFixed(2)),
    };
  }
}

export default StudentManager;
