import { useEffect, useState } from "react";
import { api } from "../api/api";
function Bukus() {
const [bukus, setBukus] = useState([]);
const [form, setForm] = useState({ title: "", penulis: "", angka: ""
});
const token = localStorage.getItem("token");
const fetchProducts = async () => {
try {
const res = await api("/buku", "GET", null, token);
setBukus(res);
} catch (err) {
console.error("Gagal ambil produk:", err);
}
};
useEffect(() => {
fetchProducts();
}, []);
const addProduct = async () => {
if (!form.title || !form.penulis || !form.angka) {
alert("Semua form harus diisi!");
return;
}
try {
await api("/product", "POST", form, token);
setForm({ title: "", penulis: "", angka: "" });
fetchProducts();
} catch (err) {
console.error("Gagal tambah produk:", err);
}
};
const deleteProduct = async (id) => {
if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
try {
await api(`/product/${id}`, "DELETE", null, token);
fetchProducts();
} catch (err) {
console.error("Gagal hapus produk:", err);
}
};
return (
<div style={{ padding: "20px" }}>
<h2>Produk</h2>
<div style={{ marginBottom: "10px" }}>
<input
placeholder="Nama"
value={form.title}
onChange={(e) => setForm({ ...form, title: e.target.value })}
/>
<input
placeholder="penulis"
value={form.penulis}
onChange={(e) => setForm({ ...form, penulis: e.target.value
})}
/>
<input
placeholder="Harga"
type="number"
value={form.angka}
onChange={(e) => setForm({ ...form, angka: e.target.value })}
/>
<button onClick={addProduct}>Tambah</button>
</div>
<ul>
{bukus.map((p) => (
<li key={p.id}>
<strong>{p.title}</strong> - {p.penulis} - Rp{p.angka}
<button
onClick={() => deleteProduct(p.id)}
style={{ marginLeft: 10 }}
>
Hapus
</button>
</li>
))}
</ul>
</div>
);
}
export default Bukus;