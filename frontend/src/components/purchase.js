import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Route, Link, Navigate} from 'react-router-dom';
import Cart from "./cart.js";
import axiosInstance from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

async function Purchase() {
    let userNameFromLS = localStorage.getItem("userName");

    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [stateOrProvince, setStateOrProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const submittedForm = useRef(false);
    const purchaseSucceeded = useRef(false);
    const afterSuccessMessage= useRef(false);

    async function handleSubmit(event) {
        event.preventDefault();

        submittedForm.current = true;

        let response = await axiosInstance.patch("/shopper/purchase", {
            userName: userNameFromLS, 
            encryptValue: localStorage.getItem("encryptValue")
        });

        if (response.data.succeeded) {
            purchaseSucceeded.current = true;
            setTimeout(() => {
                afterSuccessMessage.current = true;
            }, 2000); 
        }

    }

    useEffect(() => {
        document.title = "Make a Purchase";
    }, []);

    return (
        <BrowserRouter>
        {!userNameFromLS && <Navigate to="/" replace={true} />}
        <div style={{backgroundColor: "rgb(230, 230, 230)"}}></div>
        <h1 style={{margin: "auto"}}>Make a Purchase</h1>
        <br />
        {(!purchaseSucceeded.current && submittedForm.current) && <div style={{backgroundColor: "#F08080", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F"}}>Invalid username or password</div>}
        <Route exact path="/shopper/cart" element={<Cart />}></Route>
        <Link to="/shopper/cart" style={{color: "#800000", margin: "auto"}} target="_blank">View Your Cart</Link>
        <form onSubmit={handleSubmit}>
            <h2>Credit Card Information</h2>
            <div style={{backgroundColor: "rgb(190, 190, 190)"}}>
                <br />
                <label for="creditCardNumber">Credit Card Number:</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="creditCardNumber" name="creditCardNumber" value={creditCardNumber} onChange={(e) => {setCreditCardNumber(e.target.value);}} required />
                <label for="expirationDate">Expiration Date (MM/YYYY):</label>
                <input style={{border: "1px solid black"}} type="text" id="expirationDate" name="expirationDate" value={expirationDate} onChange={(e) => {setExpirationDate(e.target.value);}} required />
                <label for="securityCode">Security Code:</label>
                <input style={{border: "1px solid black"}} type="text" id="securityCode" name="securityCode" value={securityCode} onChange={(e) => {setSecurityCode(e.target.value);}} required />
                <br />
            </div>
            <div style={{backgroundColor: "rgb(190, 190, 190)"}}>
                <br />
                <label for="name">Name:</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="name" name="name" value={name} onChange={(e) => {setName(e.target.value);}} required />
                <label for="address">Address:</label>
                <input style={{border: "1px solid black"}} type="text" id="address" name="address" value={address} onChange={(e) => {setAddress(e.target.value);}} required />
                <label for="country">Country:</label>
                <input style={{border: "1px solid black"}} type="text" id="country" name="country" value={country} onChange={(e) => {setCountry(e.target.value);}} required />
                <label for="city">City:</label>
                <input style={{border: "1px solid black"}} type="text" id="city" name="city" value={city} onChange={(e) => {setCity(e.target.value);}} required />
                <label for="stateOrProvince">State/Province:</label>
                <input style={{border: "1px solid black"}} type="text" id="stateOrProvince" name="stateOrProvince" value={stateOrProvince} onChange={(e) => {setStateOrProvince(e.target.value);}} required />
                <label for="postalCode">Postal Code:</label>
                <input style={{border: "1px solid black"}} type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => {setPostalCode(e.target.value);}} required />
                <br />
            </div>
            <input style={{display: "flex", justifyContent: "flex-end"}} className = "btn btn-success" type="submit" value="Complete Purchase" />
        </form>
        {(purchaseSucceeded.current && submittedForm.current) && <div style={{backgroundColor: "#7CFC00", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F"}}>Purchase was successful. Going back to shopping page...</div>}
        {afterSuccessMessage.current && <Navigate to="/shopper/shopping" replace={true} />}
        </BrowserRouter>
    );
}

export default Purchase;

