import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Navigate} from 'react-router-dom';
import deleteFromCart from "../helper-functions/deleteFromCart.js";
import {getShoppingItems, getTotal} from "../helper-functions/otherCartOperations.js";
import axiosInstance from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

async function Cart() {
    const [cart, setCart] = useState([]);
    const userName = localStorage.getItem("userName") || "";
    const encryptValue = localStorage.getItem("encryptValue") || "";

    let shoppingItems = getShoppingItems(cart);
    let total = getTotal(shoppingItems);

    async function handleDelete(type) {
        let updatedCart = (await deleteFromCart(type, userName, encryptValue)).data.updatedCart;
        setCart(updatedCart);
    }

    useEffect(() => {
        document.title = "Your Cart";

        async function asyncCart() {
            let updatedCart = (await axiosInstance.get("/shopper/cart", {params: {userName: userName, encryptValue: encryptValue}})).data.updatedCart;
            setCart(updatedCart);
        }
        asyncCart();
    }, []);

    return (
        <BrowserRouter>
        {!userName && <Navigate to="/" replace={true} />}
        <div style={{backgroundColor: "rgb(230, 230, 230)"}}>
            <h1 style={{margin: "auto"}}>Your Cart</h1>
            <br />
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p>Item</p>
                <p>Cost</p>
                <div></div>
            </div>
            <br />
            {Object.keys(shoppingItems).map((type, idx) => {
                let selectionObject = shoppingItems[type];
                let arrayForType = [];
                let objNoCount = selectionObject;
                delete objNoCount.count;
                for (let i = 0; i < selectionObject.count; ++i) {
                    arrayForType.push(objNoCount);
                };
                return (
                    <React.Fragment key={selectionObject.type}>
                    {arrayForType.map((objForType, index) => {
                        return (
                            <div key={index} style={{display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid black"}}>
                                <p>{objForType.type}</p>
                                <p>${objForType.cost}</p>
                                <button className="btn btn-danger" onClick={() => {handleDelete(objForType.type);}}>Remove from Cart</button>
                            </div>
                        );
                    })}
                    </React.Fragment>
                );
            })}
            <br />
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p style={{fontSize: "20px"}}>Total:</p>
                <div></div>
                <p style={{fontWeight: "bold"}}>${total}</p>
            </div>
        </div>
        </BrowserRouter>
    )
}

export default Cart;