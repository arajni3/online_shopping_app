import axios from 'axios';

let url = (process.env.NODE_ENV === "production")? "" : "http://localhost:8000";

export default axios.create({
    baseURL: url,
    headers: {
        "Content-type": "application/json"
    }
});