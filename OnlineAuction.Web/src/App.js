import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Licitalas from "./ui/licitalas/licit";
import Aukcio from "./ui/aukcio/aukcio";
import Jelenaukciok_list from "./ui/aukciok_list/jelenaukciok_list";
import Regiaukciok_list from "./ui/aukciok_list/regiaukciok_list";
import Jovoaukciok_list from "./ui/aukciok_list/jovoaukciok_list";
import Sajat from "./ui/aukciok_list/sajat";
import AukcioSzerk from "./ui/aukcio/aukcio_szerk";
import Register from "./ui/login/register.js";
import Login from "./ui/login/login.js";
import Main from "./ui/main";

export default function App() {
  const [auth, setAuth] = useState({
    signin: false,
    username: "",
    token: "",
  });

  console.log(auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/aukcio" element={<Aukcio />} />
        <Route path="/aukcio/:id" element={<AukcioSzerk />} />
        <Route path="/licitalas/:id" element={<Licitalas />} />
        <Route path="/jelenaukciok_list" element={<Jelenaukciok_list />} />
        <Route path="/regiaukciok_list" element={<Regiaukciok_list />} />
        <Route path="/jovoaukciok_list" element={<Jovoaukciok_list />} />
        <Route path="/sajat" element={<Sajat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
