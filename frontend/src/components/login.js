import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosInstance from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const navigate = useNavigate();
    const userNameFromLS = useRef(localStorage.getItem("userName"));

    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    const submittedForm = useRef(false);
    const loggedIn = useRef(false);
    const [afterSuccessMessage, setAfterSuccessMessage] = useState(false);

    async function handleSubmit(event) {
        // prevent default behavior of form submit, which is browser tab refresh
        event.preventDefault();

        // send axios post request 
        let response = await axiosInstance.post('/login', {
            userName: username,
            passWord: password
        });
        // if login was valid, store login token (username with bcrypt value in local storage)
        // and set value of loggedIn to response.found
        if (response.data.encryptValue) {
            localStorage.setItem("userName", username);
            localStorage.setItem("encryptValue", response.data.encryptValue);
            
            submittedForm.current = true;
            loggedIn.current = true;
            setTimeout(() => {
                setAfterSuccessMessage(true);
            }, 2000);        
        } else {
            submittedForm.current = true;
        }
    };

    useEffect(() => {
        document.title = "Sign In / Start Shopping";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";       
    }, []);
    
    useEffect(() => {
        if (userNameFromLS.current || afterSuccessMessage) {
            navigate("../shopping", {replace: true});
        } 
    }, [afterSuccessMessage]);

    return (
        <>
        <h1 style={{textAlign: "center"}}>Sign in to Your Account</h1>
        <br />
        <br />
        <br />
        {(!loggedIn.current && submittedForm.current) && <div style={{backgroundColor: "#F08080", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F", display: "block", margin: "0 auto", textAlign: "center"}}>Invalid username or password</div>}
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
            <input style={{display: "flex", justifyContent: "flex-end", margin: "auto"}} className = "btn btn-success" type="submit" value="Log In" />
            </div>
        </form>
        <br />
        <br />
        <br />
        {(loggedIn.current && submittedForm.current) && <div style={{backgroundColor: "#7CFC00", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>Sign-in was successful. Redirecting to shopping page...</div>}
        </>
    );
}

export default Login;