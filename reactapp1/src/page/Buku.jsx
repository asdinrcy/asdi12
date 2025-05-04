import { useEffect, useState } from "react";
import { api } from "../api/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", deskripsi: "", angka: "" });
  const token = localStorage.getItem("token");

  const fetchBooks = async () => {
    try {
      const res = await api("/buku", "GET", null, token);
      setBooks(res);
    } catch (err) {
      console.error("Gagal ambil buku:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    if (!form.title || !form.deskripsi || !form.angka) {
      alert("Semua form harus diisi!");
      return;
    }
    try {
      await api("/buku", "POST", form, token);
      setForm({ title: "", deskripsi: "", angka: "" });
      fetchBooks();
    } catch (err) {
      console.error("Gagal tambah buku:", err);
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Yakin ingin menghapus buku ini?")) return;
    try {
      await api(`/buku/${id}`, "DELETE", null, token);
      fetchBooks();
    } catch (err) {
      console.error("Gagal hapus buku:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Buku</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Judul Buku"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Penulis"
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
        />
        <input
          placeholder="Harga Buku"
          type="number"
          value={form.angka}
          onChange={(e) => setForm({ ...form, angka: e.target.value })}
        />
        <button onClick={addBook}>Tambah</button>
      </div>
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            <strong>{b.title}</strong> - {b.deskripsi} - Rp{b.angka}
            <button onClick={() => deleteBook(b.id)} style={{ marginLeft: 10 }}>
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
