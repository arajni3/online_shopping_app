import React, {useState, useEffect, useRef} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Shopping from "./shopping.js";
import axiosInstance from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const userNameFromLS = useRef(localStorage.getItem("userName"));

    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    const submittedForm = useRef(false);
    const loggedIn = useRef(false);
    const afterSuccessMessage= useRef(false);
    const encrypt_value = useRef("");

    async function handleSubmit(event) {
        // prevent default behavior of form submit, which is browser tab refresh
        event.preventDefault();

        submittedForm.current = true;

        // send axios post request 
        let response = await axiosInstance.post('/login', {
            userName: username,
            passWord: password
        });

        // if login was valid, store login token (username with bcrypt value in local storage)
        // and set value of loggedIn to response.found
        if (response.data.encryptValue) {
            encrypt_value.current = response.data.encryptValue;
            localStorage.setItem("userName", username);
            localStorage.setItem("encryptValue", encrypt_value);

            loggedIn.current = true;
            setTimeout(() => {
                afterSuccessMessage.current = true;
            }, 2000);        
        }
    };

    useEffect(() => {
        document.title = "Sign In / Start Shopping";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";
    }, []);

    return (
        <>
        <Routes>
        <Route path="/shopper/shopping" element={<Shopping />}></Route>
        </Routes>
        <h1 style={{textAlign: "center"}}>Sign in to Your Account</h1>
        <br />
        {(!loggedIn.current && submittedForm.current) && <div style={{backgroundColor: "#F08080", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F"}}>Invalid username or password</div>}
        <form onSubmit={handleSubmit}>
            <label for="username">Username:</label>
            <br />
            <input style={{border: "1px solid black"}} type="text" id="username" name="username" value={username} onChange={(e) => {setUserName(e.target.value);}} required />
            <label for="password">Password:</label>
            <br />
            <input style={{border: "1px solid black"}} type="password" id="password" name="password" value={password} onChange = {(e) => {setPassWord(e.target.value);}} required />
            <input style={{display: "flex", justifyContent: "flex-end"}} className = "btn btn-success" type="submit" value="Log In" />
        </form>
        {(loggedIn.current && submittedForm.current) && <div style={{backgroundColor: "#7CFC00", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F"}}>Sign-in was successful. Redirecting to shopping page...</div>}
        {(afterSuccessMessage.current || userNameFromLS.current) && <Navigate to="/shopper/shopping" replace={true} />}
        </>
    );
}

export default Login;