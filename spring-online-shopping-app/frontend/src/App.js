import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Home from "./components/home.js";
import Login from './components/login.js';
import CreateAccount from './components/createAccount.js';
import Shopping from './components/shopping.js';
import Cart from "./components/cart.js";
import PurchaseHistory from "./components/purchaseHistory.js";
import Purchase from "./components/purchase.js";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", {replace: true});
  }, []);

  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="login" element={<Login />}></Route>
    <Route path="createAccount" element={<CreateAccount />}></Route>
    <Route path="shopping" element={<Shopping />}></Route>
    <Route path="shopping/cart" element={<Cart />}></Route>
    <Route path="shopping/purchaseHistory" element={<PurchaseHistory />}></Route>
    <Route path="shopping/purchase" element={<Purchase />}></Route>
    </Routes>
  );
}

export default App;
