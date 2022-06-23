import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Route, Navigate} from 'react-router-dom';
import signOut from "../helper-functions/signOut.js";
import Login from "./login.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

// very similar to Login
async function createAccount() {
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    const submittedForm = useRef(false);
    const succeeded = useRef(false);
    const afterSuccessMessage = useRef(false);

    async function handleSubmit(event) {
        event.preventDefault();

        signOut();

        submittedForm.current = true;

        let response = await axios.post('/createAccount', {
            userName: username,
            passWord: password
        });

        // display success message for 2 seconds before redirecting to login page
        if (response.data.succeeded) {
            succeeded.current = true;
            setTimeout(() => {
                afterSuccessMessage.current = true;
            }, 2000);
        }
    }

    useEffect(() => {
        document.title = "Create Account";
    }, []);

    return (
        <BrowserRouter>
        <div style={{backgroundColor: "rgb(230, 230, 230)"}}>
        <h1 style={{margin: "auto"}}>Create an Account</h1>
        <br />
        {(!succeeded && submittedForm) && <div style={{backgroundColor: "#F08080", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F"}}>Invalid username or password.</div>}
        <form onSubmit={handleSubmit}>
            <label for="username">Username:</label>
            <br />
            <input style={{border: "1px solid black"}} type="text" id="username" name="username" value={username} onChange={(e) => {setUserName(e.target.value);}} required />
            <label for="password">Password:</label>
            <br />
            <input style={{border: "1px solid black"}} type="password" id="password" name="password" value={password} onChange = {(e) => {setPassWord(e.target.value);}} required />
            <input style={{display: "flex", justifyContent: "flex-end"}} className = "btn btn-success" type="submit" value="Create" />
        </form>
        {succeeded && <div style={{backgroundColor: "#7CFC00", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F"}}>Account creation was successful. Redirecting to login page...</div>}
        <Route path="/login" element={<Login />}></Route>
        {afterSuccessMessage && <Navigate to="/login"/>}
        </div>
        </BrowserRouter>
    );
}

export default createAccount;