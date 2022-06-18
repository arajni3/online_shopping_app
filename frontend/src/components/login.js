import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Route, Navigate} from 'react-router-dom';
import bcrypt from "bcrypt";
import Shopping from "shopping.js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Compute bcrypt value (on frontend) every time user logs in, 
// never on backend and never when user creates an account.
// For onChange for input password, hash a new bcrypt value for the candidate password.
// Have an input field in the form whose value is the bcrypt value.
// When user submits their possible login, post bcrypt value and entered username and password.
// On backend, try to find the (unique) user with this username and password;
// if such a user is found, update (initial bcrypt value is "") their bcrypt value to the posted 
// bcrypt value.
// The server will send (respond with) a JSON object with a "found" value of true or false.
function Login() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("userName") ? true : false);
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    const submittedForm = useRef(false);
    const bcrypt_value = useRef("");

    const handlePassword = (password) => {
        setPassWord(password);

        // calculate new bcrypt value with 10 salt rounds
        bcrypt.hash(password, 10, (err, hash) => {
            bcrypt_value.current = hash;
        });   
    };

    async function handleSubmit(event) {
        // prevent default behavior of form submit, which is browser tab refresh
        event.preventDefault();

        submittedForm.current = true;

        // send axios post request 
        let response = await axios.post('/login', {
            userName: username,
            passWord: password,
            bcryptValue: bcrypt_value
        });

        // if login was valid, store login token (username with bcrypt value in local storage)
        // and set value of loggedIn to response.found
        if (response.found) {
            localStorage.setItem("userName", username);
            localStorage.setItem("bcryptValue", bcrypt_value);
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
            <input type="password" id="password" name="password" value={password} onChange = {(e) => {handlePassword(e.target.value);}} required></input>
            <input type="submit" value="Log In"></input>
        </form>
        <Route path="user/shopping" element={<Shopping userName={username} bcryptValue={bcrypt_value} />}></Route>
        {loggedIn && <Navigate to="user/shopping" replace={true} />}
        </BrowserRouter>
    );
}

export default Login;