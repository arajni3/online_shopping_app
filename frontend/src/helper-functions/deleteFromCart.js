import axiosInstance from "../httpRequests.js";

// add the shopping selection (represented by its src) to the shopper's cart
function deleteFromCart(type, userName, encryptValue) {
    return axiosInstance.patch('/shopper/addToCart', {
        userName: userName,
        encryptValue: encryptValue,
        type: type
    });
}

export default deleteFromCart;