import React, {useEffect, useRef} from 'react';
import {Route, Link, Routes, Navigate} from 'react-router-dom';
import shoppingSelections from "../constants/shoppingSelections.js";
import ShoppingItem from "./shoppingItem.js";
import Cart from "./cart.js";
import PurchaseHistory from "./purchaseHistory.js";
import Purchase from "./purchase.js";
import signOut from "../helper-functions/signOut.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Shopping() {    
    let userName = useRef(localStorage.getItem("userName") || "");
    let encryptValue = useRef(localStorage.getItem("encryptValue") || "");

    let rows = [];
    for (let i = 0; i < shoppingSelections.length; i += 3) {
        let row = [];
        for (let j = i; (j <= i + 2) && (j < shoppingSelections.length); ++j) {
            row.push((<ShoppingItem shoppingItem={shoppingSelections[j]} userName={userName.current} encryptValue={encryptValue.current} />));
        }
        rows.push(row);
    }

    const handleSignOut = () => {
        signOut();
        userName.current = "";
    };

    useEffect(() => {
        document.title = "Shopping";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";
    });

    return (
        <>
        <Routes>
        <Route path="/shopper/cart" element={<Cart />}></Route>
        <Route path="/shopper/purchaseHistory" element={<PurchaseHistory />}></Route>
        <Route path="/shopper/purchase" element={<Purchase />}></Route>
        </Routes>
        {!userName.current && <Navigate to="/" replace={true} />}
        <nav className="navbar" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Link to="/" className="btn btn-light" style={{fontSize: "20px"}}>Ashwin's Clothing Store</Link>
            <Route exact path="/shopper/cart" element={<Cart />}><Link to="/shopper/cart" style={{color: "#800000"}}>My Cart</Link></Route>
            <Route exact path="/shopper/purchaseHistory" element={<PurchaseHistory />}><Link to="/shopper/purchaseHistory"style={{color: "#800000"}}>My Purchase History</Link></Route>
            <button onClick={handleSignOut}style={{color: "#800000"}}>Sign Out</button>
        </nav>
        <br />
        <h1 style={{textAlign: "center"}}>View and Select from Our Selections!</h1>
        <br />  
        {rows.map((row, index) => {
            return (
                <React.Fragment key={index}>
                <div key={row[0].type} style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    {row.map((item) => (<React.Fragment key={item.type}>{item}</React.Fragment>))}
                </div>
                <br />
                </React.Fragment>
            );
        })}
        <div style={{display: "flex", justifyContent: "flex-end"}}>
        <Route exact path="/shopper/purchase" element={<Purchase />}><Link className="btn btn-success" to="/shopper/purchase">Make Purchase</Link></Route>
        </div>
        </>
    );
}

export default Shopping;
