import React, {useState, useEffect, useRef} from 'react';
import {Navigate} from 'react-router-dom';
import deleteFromCart from "../helper-functions/deleteFromCart.js";
import {getShoppingItems, getTotal} from "../helper-functions/otherCartOperations.js";
import axiosInstance from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart() {
    const [cart, setCart] = useState([]);
    const userName = useRef(localStorage.getItem("userName") || "");
    const encryptValue = useRef(localStorage.getItem("encryptValue") || "");

    let shoppingItems = getShoppingItems(cart);
    let total = getTotal(shoppingItems);

    async function handleDelete(type) {
        let updatedCart = (await deleteFromCart(type, userName, encryptValue)).data.updatedCart;
        setCart(updatedCart);
    }

    useEffect(() => {
        document.title = "Your Cart";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";

        async function asyncCart() {
            let asyncInitialCart = (await axiosInstance.get("/shopper/cart", {params: {userName: userName.current, encryptValue: encryptValue.current}})).data.cart;
            setCart(asyncInitialCart);
        }
        asyncCart();
    }, []);

    return (
        <>
        {!userName.current && <Navigate to="/" replace={true} />}
        <>
            <h1 style={{textAlign: "center"}}>Your Cart</h1>
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
        </>
        </>
    )
}

export default Cart;