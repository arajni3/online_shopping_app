import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import signOut from "../helper-functions/signOut.js";
import "bootstrap/dist/css/bootstrap.min.css";
import {axiosShopping} from "../httpRequests.js";

// very similar to Login
function CreateAccount() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    // successState = 0 means unsubmitted form, 1 means invalid account creation (the login already exists),
    // and 2 means successful account creation
    const [successState, setSuccessState] = useState(0);

    async function handleSubmit(event) {
        event.preventDefault();

        signOut();

        let response = await axiosShopping.post('/createAccount', {
            userName: username,
            passWord: password
        });
        if (response.data.succeeded) {
            setSuccessState(2);
        } else {
            setSuccessState(1);
        }
    }

    useEffect(() => {
        document.title = "Create Account";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";
    }, []);

    useEffect(() => {
        if (successState == 2) {
            // success message displays at the bottom for 2 seconds before navigating to login page
            setTimeout(() => {
                navigate("../login");
            }, 2000);
        }
    }, [successState]);

    return (
        <>
        <h1 style={{textAlign: "center"}}>Create an Account</h1>
        <br />
        <br />
        <br />
        {successState == 1 && <div style={{backgroundColor: "#F08080", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F", display: "block", margin: "0 auto", textAlign: "center"}}>Invalid username or password.</div>}
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
        {successState == 2 && <div style={{backgroundColor: "#7CFC00", fontWeight: "bold", width: "200px", height: "100px", color: "2F4F4F", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>Account creation was successful. Redirecting to login page...</div>}
        </>
    );
}

export default CreateAccount;