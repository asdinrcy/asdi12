import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./page/Login";
import Register from "./page/Register";
import Buku from "./page/Buku";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/buku" element={<Buku/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
