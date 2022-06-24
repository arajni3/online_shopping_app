import axios from 'axios';

let url = (process.env.NODE_ENV === "production")? "" : "http://localhost:5000";

export default axios.create({
    baseURL: url,
    headers: {
        "Content-type": "application/json"
    }
});