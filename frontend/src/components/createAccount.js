import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Route, Navigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axiso from "axios";

// very similar to Login
function createAccount() {
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    const submittedForm = useRef(false);
    const succeeded = useRef(false);
    const afterSuccessMessage = useRef(false);

    async function handleSubmit(event) {
        event.preventDefault();

        submittedForm.current = true;

        let response = await axios.post('/createAccount', {
            userName: username,
            passWord: password
        });

        // display success message for 2 seconds before redirecting to login page
        if (response.succeeded) {
            succeeded.current = response.succeeded;
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
        <div>{(!succeeded && submittedForm) && <h2>Invalid username or password</h2>}</div>
        <form onSubmit={handleSubmit}>
            <label for="username">Username:</label>
            <br>
            </br>
            <input type="text" id="username" name="username" value={username} onChange={(e) => {setUserName(e.target.value);}} required></input>
            <label for="password">Password:</label>
            <br>
            </br>
            <input type="password" id="password" name="password" value={password} onChange = {(e) => {setPassWord(e.target.value);}} required></input>
            <input type="submit" value="Create"></input>
        </form>
        {succeeded && <div>Account creation was successful. Redirecting to login page...</div>}
        <Route path="/login" element={<Login />}></Route>
        {afterSuccessMessage && <Navigate to="/login"/>}
        </BrowserRouter>
    );
}

export default createAccount;