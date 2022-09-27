import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ShoppingItem from "./shoppingItem.js";
import signOut from "../helper-functions/signOut.js";
import {axiosAWS} from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Shopping() { 
    const navigate = useNavigate();   
    let userName = useRef(localStorage.getItem("userName") || "");
    let encryptValue = useRef(localStorage.getItem("encryptValue") || "");

    let [rows, setRows] = useState([]);

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
        } else {
            async function getImageData() {                
                let imageData = (await axiosAWS.get("imageData")).data.imageData;
                
                let shoppingSelectionRows = [];
                for (let i = 0; i < imageData.length; i += 3) {
                    let third = i + 3;

                    let row = [];
                    for (let j = i; (j < third) && (j < imageData.length); ++j) {
                        row.push(imageData[j]);
                    }
                    shoppingSelectionRows.push(row);
                }
                setRows(shoppingSelectionRows);
            }
            getImageData();
        }
    }, []);

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
        <h2>{row.length}</h2>
        <br />  
        {rows.map((row, index) => {
            return (
                <React.Fragment key={index}>
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                    {row.map((item, index2) => (<ShoppingItem key={index2} type={item['image_description']} sthreeKey={item['image_sthree_key']} cost={item['cost']} userName={userName.current} encryptValue={encryptValue.current} />))}
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
