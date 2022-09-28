import React from 'react';
import {axiosShopping} from "../httpRequests.js";
import formattedCost from "../helper-functions/formatCost.js";
import "bootstrap/dist/css/bootstrap.min.css";

// in Shopping, pass a shopping selection as prop shoppingSelection to ShoppingItem
function ShoppingItem({type, sthreeKey, cost, userName, encryptValue}) {
    console.log(JSON.stringify(type), JSON.stringify(sthreeKey), JSON.stringify(cost));
    // add the shopping selection (represented by its src) to the shopper's cart
    async function addToCart(type, username, encryptvalue) {
        await axiosShopping.patch('/shopper/addToCart', {
            userName: username,
            encryptValue: encryptvalue,
            type: type
        });
    }

    return (
        <div style={{backgroundColor: "rgb(255, 255, 255)", border: "1px solid black"}}>
            <img src={`http://dciqk8694vejl.cloudfront.net/${sthreeKey}`} alt={type} width="200" height="240" />
            <p style={{textAlign: "center"}}>{type}</p>
            <br />
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p>Cost: ${formattedCost(cost)}</p>
                <button className="btn btn-dark" onClick={() => addToCart(type, userName, encryptValue)}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ShoppingItem;
