import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "../components/Home";
import Feature from "../components/Feature";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features/:id" element={<Feature />}></Route>
    </Routes>
  </Router>
);