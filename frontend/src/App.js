import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/login.js';
import CreateAccount from './components/createAccount.js';

function App() {
  const username = localStorage.getItem("userName");

  const signOut = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("bcryptValue");
    window.location.reload();
  };

  useEffect(() => {
    document.title = "Ashwin's Clothing Store";
  });
  
  return (
    <BrowserRouter>
    <div className="App">
    <h1>{"Welcome to Ashwin's Clothing Store" + (username ? `, ${username}` : "") + "!"}</h1>
    <span className="App-header">
      <Link to="login">Sign in / Start Shopping</Link>
      <Link to="createAccount">Create an Account</Link>
      {username && <button onClick={signOut}>Sign Out</button>}
    </span>
    <Routes>
      <Route exact path="login" element={<Login />}></Route>
      <Route exact path="createAccount" element={<CreateAccount />}></Route>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
