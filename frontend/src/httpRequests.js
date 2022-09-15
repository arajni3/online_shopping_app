import axios from 'axios';

export const axiosShopping = axios.create({
    baseURL: "/api/v2/shopping",
    headers: {
        "Content-type": "application/json"
    }
});

export const axiosAWS = axios.create({
    baseURL: "/api/v2/aws-requests",
    headers: {
        "Content-type": "application/json"
    }
});