import React from 'react';
import addToCart from "../helper-functions/addToCart.js";
import "bootstrap/dist/css/bootstrap.min.css";

// in Shopping, pass a ShoppingSelection as prop shoppingSelection to ShoppingItem
async function ShoppingItem({shoppingSelection: {type, src, cost}, userName, encryptValue}) {
    return (
        <div style={{backgroundColor: "rgb(255, 255, 255)", border: "1px solid black"}}>
            <img src={src} alt={type} width="500" height="600" />
            <p>{type}</p>
            <br />
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p>Cost: ${cost}</p>
                <button className="btn btn-dark" onClick = {() => await addToCart(type, userName, encryptValue)}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ShoppingItem;