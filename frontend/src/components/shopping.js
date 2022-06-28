import React, {useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import shoppingSelections from "../constants/shoppingSelections.js";
import ShoppingItem from "./shoppingItem.js";
import signOut from "../helper-functions/signOut.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Shopping() { 
    const navigate = useNavigate();   
    let userName = useRef(localStorage.getItem("userName") || "");
    let encryptValue = useRef(localStorage.getItem("encryptValue") || "");

    let rows = [];
    for (let i = 0; i < shoppingSelections.length; i += 3) {
        let row = [];
        for (let j = i; (j <= i + 2) && (j < shoppingSelections.length); ++j) {
            row.push(shoppingSelections[j]);
        }
        rows.push(row);
    }

    const handleSignOut = () => {
        signOut();
        userName.current = "";
        navigate("/", {replace: true});
    };

    useEffect(() => {
        document.title = "Shopping";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";

        if (!userName.current) {
            navigate("/", {replace: true});
        }
    });

    return (
        <>
        <nav className="navbar" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Link to="/" className="btn btn-light" style={{fontSize: "20px"}}>Ashwin's Clothing Store</Link>
            <Link to="cart" className="btn" style={{color: "#FFFFFF", backgroundColor: "#800000"}}>My Cart</Link>
            <Link to="purchaseHistory" className="btn" style={{color: "#FFFFFF", backgroundColor: "#800000"}}>My Purchase History</Link>
            <button onClick={handleSignOut} className="btn" style={{color: "#FFFFFF", backgroundColor: "#800000"}}>Sign Out</button>
        </nav>
        <br />
        <h1 style={{textAlign: "center"}}>View and Select from Our Selections!</h1>
        <br />  
        {rows.map((row, index) => {
            return (
                <React.Fragment key={index}>
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                    {row.map((item, index2) => (<ShoppingItem key={index2} shoppingSelection={item} userName={userName.current} encryptValue={encryptValue.current} />))}
                </div>
                <br />
                </React.Fragment>
            );
        })}
        <Link style={{display: "block", margin: "0 0 0 auto", width: "fit-content", textAlign: "center"}} className="btn btn-success" to="purchase">Make Purchase</Link>
        </>
    );
}

export default Shopping;
