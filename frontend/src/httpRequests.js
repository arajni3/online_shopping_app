import axios from 'axios';

export default axios.create({
    baseURL: "/api/v1/shopping",
    headers: {
        "Content-type": "application/json"
    }
});