import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import formattedCost from "../helper-functions/formatCost.js";
import {getShoppingItems, getTotal} from "../helper-functions/otherCartOperations.js";
import {axiosShopping, axiosAWS} from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const userName = useRef(localStorage.getItem("userName") || "");
    const encryptValue = useRef(localStorage.getItem("encryptValue") || "");
    
    const [shoppingItems, setShoppingItems] = useState({});
    let total = getTotal(shoppingItems);

    // add the shopping selection (represented by its src) to the shopper's cart
    function deleteFromCart(type, username, encryptvalue) {
        return axiosShopping.patch('/shopper/deleteFromCart', {
            userName: username,
            encryptValue: encryptvalue,
            type: type
        });
    }

    async function handleDelete(type) {
        let updatedCart = (await deleteFromCart(type, userName.current, encryptValue.current)).data.updatedCart;
        setCart(updatedCart);
    }

    useEffect(() => {
        document.title = "Your Cart";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";

        if (!userName.current) {
            navigate("/", {replace: true});
        } else {
            async function getCart() {
                let asyncInitialCart = (await axiosShopping.get("/shopper/cart", {params: {userName: userName.current, encryptValue: encryptValue.current}})).data.cart;
                setCart(asyncInitialCart);
            }
            getCart();
        }
    }, []);

    useEffect(() => {
        async function getList() {
            let imageData = (await axiosAWS.get("imageData")).data.imageData;
            setShoppingItems(getShoppingItems(cart, imageData));
        }
        getList();
    }, [cart]);
    
    return (
        <>
            <h1 style={{textAlign: "center"}}>Your Cart</h1>
            <br />
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p>Item</p>
                <p>Cost</p>
                <div></div>
            </div>
            <br />
            {Object.keys(shoppingItems).map((type) => {
                let selectionObject = shoppingItems[type];
                let arrayForType = [];
                let objNoCount = JSON.parse(JSON.stringify(selectionObject));
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
                                <p>${formattedCost(objForType.cost)}</p>
                                <button className="btn btn-danger" onClick={() => {handleDelete(objForType.type);}}>Remove from Cart</button>
                            </div>
                        );
                    })}
                    </React.Fragment>
                );
            })}
            <br />
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold"}}>
                <p style={{fontSize: "20px"}}>Total:</p>
                <p>${formattedCost(total)}</p>
                <div></div>
            </div>
        </>
    )
}

export default Cart;
