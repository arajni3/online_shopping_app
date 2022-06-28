import React from 'react';
import axiosInstance from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

// in Shopping, pass a ShoppingSelection as prop shoppingSelection to ShoppingItem
function ShoppingItem({shoppingSelection: {type, src, cost}, userName, encryptValue}) {
    // add the shopping selection (represented by its src) to the shopper's cart
    async function addToCart(type, username, encryptvalue) {
        let completedPromise = await axiosInstance.patch('/shopper/addToCart', {
            userName: username,
            encryptValue: encryptvalue,
            type: type
        });
        return completedPromise;
    }

    return (
        <div style={{backgroundColor: "rgb(255, 255, 255)", border: "1px solid black"}}>
            <img src={src} alt={type} width="200" height="240" />
            <p style={{textAlign: "center"}}>{type}</p>
            <br />
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p>Cost: ${cost}</p>
                <button className="btn btn-dark" onClick={() => addToCart(type, userName, encryptValue)}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ShoppingItem;