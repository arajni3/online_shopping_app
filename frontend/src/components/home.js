import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import signOut from "../helper-functions/signOut.js";

function Home() {
  let [userName, setUserName] = useState(localStorage.getItem("userName"));

  useEffect(() => {
    document.title = "Ashwin's Clothing Store";
    document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";
  }, []);
  
  const handleSignOut = () => {
    signOut();
    setUserName("");
  };

  return (
    <>
    <h1 style={{textAlign: "center"}}>{"Welcome to Ashwin's Clothing Store" + (userName ? `, ${userName}` : "") + "!"}</h1>
    <br />
    <br />
    <br />
    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
      <Link className="btn btn-primary" to="login">Sign in / Start Shopping</Link>
      <Link className="btn btn-primary" to="createAccount">Create an Account</Link>
      {userName && <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>}
    </div>
    </>
  );
}

export default Home;
