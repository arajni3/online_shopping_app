import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Purchase() {
    const navigate = useNavigate();
    let userNameFromLS = useRef(localStorage.getItem("userName"));

    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [stateOrProvince, setStateOrProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    // purchaseSuccessState = 0 means unsubmitted form, 1 means invalid account creation (the login already exists),
    // and 2 means successful account creation
    const [purchaseSuccessState, setPurchaseSuccessState] = useState(0);

    async function handleSubmit(event) {
        event.preventDefault();

        let response = await axiosInstance.patch("/shopper/purchase", {
            userName: userNameFromLS.current, 
            encryptValue: localStorage.getItem("encryptValue")
        });
        if (response.data.succeeded) {
            setPurchaseSuccessState(2);
        } else {
            setPurchaseSuccessState(1);
        }
    }

    useEffect(() => {
        document.title = "Make a Purchase";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";
    }, []);

    useEffect(() => {
        if (!userNameFromLS.current) {
            navigate("/", {replace: true});
        } else if (purchaseSuccessState == 2) {
            // success message displays at the bottom for 2 seconds before navigating to shopping page
            setTimeout(() => {
                navigate("../shopping", {replace: true});
            }, 2000);            
        }
    }, [purchaseSuccessState]);

    return (
        <>
        <h1 style={{textAlign: "center"}}>Make a Purchase</h1>
        <br />
        <br />
        {purchaseSuccessState == 1 && <div style={{backgroundColor: "#F08080", fontWeight: "bold", width: "250px", height: "125px", color: "2F4F4F", display: "block", margin: "0 auto", textAlign: "center"}}>Purchase cannot be made. Your cart is empty. Please go back to the shopping page and add to your cart.</div>}
        <br />
        <br />
        <Link className="btn" to="../shopping/cart" style={{backgroundColor: "#800000", color: "#FFFFFF", display: "block", margin: "0 auto", width: "fit-content"}}>View Your Cart</Link>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
            <h2>Credit Card Information</h2>
            <div style={{backgroundColor: "rgb(190, 190, 190)"}}>
                <br />
                <label htmlFor="creditCardNumber">Credit Card Number:</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="creditCardNumber" name="creditCardNumber" value={creditCardNumber} onChange={(e) => {setCreditCardNumber(e.target.value);}} required />
                <br />
                <label htmlFor="expirationDate">Expiration Date (MM/YYYY):</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="expirationDate" name="expirationDate" value={expirationDate} onChange={(e) => {setExpirationDate(e.target.value);}} required />
                <br />
                <label htmlFor="securityCode">Security Code:</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="securityCode" name="securityCode" value={securityCode} onChange={(e) => {setSecurityCode(e.target.value);}} required />
                <br />
                <br />
            </div>
            <br />
            <h2>Billing Address Information</h2>
            <div style={{backgroundColor: "rgb(190, 190, 190)"}}>
                <br />
                <label htmlFor="name">Name:</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="name" name="name" value={name} onChange={(e) => {setName(e.target.value);}} required />
                <br />
                <label htmlFor="address">Address:</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="address" name="address" value={address} onChange={(e) => {setAddress(e.target.value);}} required />
                <br />
                <label htmlFor="country">Country:</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="country" name="country" value={country} onChange={(e) => {setCountry(e.target.value);}} required />
                <br />
                <label htmlFor="city">City:</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="city" name="city" value={city} onChange={(e) => {setCity(e.target.value);}} required />
                <br />
                <label htmlFor="stateOrProvince">State/Province:</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="stateOrProvince" name="stateOrProvince" value={stateOrProvince} onChange={(e) => {setStateOrProvince(e.target.value);}} required />
                <br />
                <label htmlFor="postalCode">Postal Code:</label>
                <br />
                <input style={{border: "1px solid black"}} type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => {setPostalCode(e.target.value);}} required />
                <br />
                <br />
            </div>
            <br />
            <br />
            <input style={{display: "flex", justifyContent: "flex-end", margin: "auto"}} className = "btn btn-success" type="submit" value="Complete Purchase" />
        </form>
        <br />
        <br />
        <br />
        {purchaseSuccessState == 2 && <div style={{backgroundColor: "#7CFC00", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>Purchase was successful. Going back to shopping page...</div>}
        </>
    );
}

export default Purchase;

