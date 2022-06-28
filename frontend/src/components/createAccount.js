import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import signOut from "../helper-functions/signOut.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../httpRequests.js";

// very similar to Login
function CreateAccount() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    const submittedForm = useRef(false);
    const succeeded = useRef(false);
    const [afterSuccessMessage, setAfterSuccessMessage] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        signOut();

        let response = await axiosInstance.post('/createAccount', {
            userName: username,
            passWord: password
        });

        // display success message for 2 seconds before redirecting to login page
        if (response.data.succeeded) {
            submittedForm.current = true;
            succeeded.current = true;
            setTimeout(() => {
                setAfterSuccessMessage(true);
            }, 2000);
        } else {
            submittedForm.current = true;
        }
    }

    useEffect(() => {
        document.title = "Create Account";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";
    }, []);

    useEffect(() => {
        if (afterSuccessMessage) {
            navigate("../login");
        }
    }, [afterSuccessMessage]);

    return (
        <>
        <h1 style={{textAlign: "center"}}>Create an Account</h1>
        <br />
        <br />
        <br />
        {(!succeeded.current && submittedForm.current) && <div style={{backgroundColor: "#F08080", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F", display: "block", margin: "0 auto", textAlign: "center"}}>Invalid username or password.</div>}
        <br />
        <br />
        <br />
        <form onSubmit={handleSubmit}>
            <div style={{textAlign: "center"}}>
            <label htmlFor="username">Username:</label>
            <br />
            <input style={{border: "1px solid black"}} type="text" id="username" name="username" value={username} onChange={(e) => {setUserName(e.target.value);}} required />
            <br />
            <label htmlFor="password">Password:</label>
            <br />
            <input style={{border: "1px solid black"}} type="password" id="password" name="password" value={password} onChange = {(e) => {setPassWord(e.target.value);}} required />
            <br />
            <br />
            <input style={{display: "flex", justifyContent: "flex-end", textAlign: "center", margin: "auto"}} className = "btn btn-success" type="submit" value="Create" />
            </div>
        </form>
        <br />
        <br />
        <br />
        {succeeded.current && <div style={{backgroundColor: "#7CFC00", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>Account creation was successful. Redirecting to login page...</div>}
        </>
    );
}

export default CreateAccount;