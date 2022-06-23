import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './login.js';
import CreateAccount from './components/createAccount.js';
import signOut from "../helper-functions/signOut.js";

function Home() {
  let userName = localStorage.getItem("userName");

  useEffect(() => {
    document.title = "Ashwin's Clothing Store";
  });
  
  const signOutAndReload = () => {
    signOut();
    window.location.reload();
  };

  return (
    <BrowserRouter>
    <div style={{backgroundColor: "rgb(230, 230, 230)"}}>
    <h1 style={{margin: "auto"}}>{"Welcome to Ashwin's Clothing Store" + (userName ? `, ${userName}` : "") + "!"}</h1>
    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
      <Link className="btn btn-primary" to="login">Sign in / Start Shopping</Link>
      <Link className="btn btn-primary" to="createAccount">Create an Account</Link>
      {userName && <button className="btn btn-primary" onClick={signOutAndReload}>Sign Out</button>}
    </div>
    </div>
    <Routes>
    <Route path="login" element={<Login />}></Route>
    <Route path="createAccount" element={<CreateAccount />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default Home;
