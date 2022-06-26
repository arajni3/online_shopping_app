import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Home from "./components/home.js";

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Home />} />
    </Routes>
    <Navigate to="/" replace={true} />
    </>
  );
}

export default App;
