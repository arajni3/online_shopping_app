import React, {useEffect} from 'react';
import {BrowserRouter, Route, Navigate} from 'react-router-dom';
import Home from "./components/home.js";

function App() {
  return (
    <BrowserRouter>
    <Route path="/" element={<Home />} />
    <Navigate to="/" replace={true} />
    </BrowserRouter>
  );
}

export default App;
