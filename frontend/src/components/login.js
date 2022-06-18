import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Route, Navigate} from 'react-router-dom';
import bcrypt from "bcrypt";
import Shopping from "shopping.js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("userName") ? true : false);
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    const submittedForm = useRef(false);
    let encrypt_value;

    async function handleSubmit(event) {
        // prevent default behavior of form submit, which is browser tab refresh
        event.preventDefault();

        submittedForm.current = true;

        // send axios post request 
        let response = await axios.post('/login', {
            userName: username,
            passWord: password
        });

        // if login was valid, store login token (username with bcrypt value in local storage)
        // and set value of loggedIn to response.found
        if (response.encryptValue) {
            encrypt_value = response.encryptValue;
            localStorage.setItem("userName", username);
            localStorage.setItem("encryptValue", encryptValue);
            setLoggedIn(true);           
        }
    };

    useEffect(() => {
        document.title = "Sign In / Start Shopping";
    }, []);

    return (
        <BrowserRouter>
        {(!loggedIn && submittedForm) && <div>Invalid username or password</div>}
        <form onSubmit={handleSubmit}>
            <label for="username">Username:</label>
            <br>
            </br>
            <input type="text" id="username" name="username" value={username} onChange={(e) => {setUserName(e.target.value);}} required></input>
            <label for="password">Password:</label>
            <br>
            </br>
            <input type="password" id="password" name="password" value={password} onChange = {(e) => {setPassword(e.target.value);}} required></input>
            <input type="submit" value="Log In"></input>
        </form>
        <Route path="user/shopping" element={<Shopping userName={username} encryptValue={encrypt_value} />}></Route>
        {loggedIn && <Navigate to="user/shopping" replace={true} />}
        </BrowserRouter>
    );
}

export default Login;