import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Licitalas from "./ui/licitalas/licit";
import Aukcio from "./ui/aukcio/aukcio";
import Aukciok_list from "./ui/aukciok_list/aukciok_list";
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
        <Route path="/licitalas" element={<Licitalas />} />
        <Route path="/aukciok_list" element={<Aukciok_list />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
