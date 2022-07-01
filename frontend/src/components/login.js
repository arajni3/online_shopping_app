import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosInstance from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const navigate = useNavigate();
    const userNameFromLS = useRef(localStorage.getItem("userName"));

    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    // encryptValue = null means uninitialized, "" means invalid login, and a nonempty value means
    // successful login
    const [encryptValue, setEncryptValue] = useState(null);

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
        // response.data.encryptValue is either the empty string or a nonempty string
        setEncryptValue(response.data.encryptValue);
    };

    useEffect(() => {
        document.title = "Sign In / Start Shopping";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";       
    }, []);
    
    useEffect(() => {
        if (userNameFromLS.current) {
            navigate("../shopping", {replace: true});
        } else if (encryptValue !== null && encryptValue !== "") {
            localStorage.setItem("userName", username);
            localStorage.setItem("encryptValue", encryptValue);

            // success message displays at the bottom for 2 seconds before navigating to shopping page
            setTimeout(() => {
                navigate("../shopping", {replace: true});
            }, 2000);  
        }
    }, [encryptValue]);

    return (
        <>
        <h1 style={{textAlign: "center"}}>Sign in to Your Account</h1>
        <br />
        <br />
        <br />
        {encryptValue === "" && <div style={{backgroundColor: "#F08080", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F", display: "block", margin: "0 auto", textAlign: "center"}}>Invalid username or password</div>}
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
        {(encryptValue !== null && encryptValue !== "") && <div style={{backgroundColor: "#7CFC00", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>Sign-in was successful. Redirecting to shopping page...</div>}
        </>
    );
}

export default Login;