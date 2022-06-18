import express from "express";
import bcrypt from "bcrypt";
import Shopper from "./shopper.controller.js";


const saltRounds = 10;

const router = express.Router();


router.post("/createAccount", (req, res) => {
    let userName = req.body.username;
    let passWord = req.body.password;

    let response = {succeeded: false};
    Shopper.findOne({username: userName, password: passWord}, (err, shopper) => {
        // if shopper is null, then there is currently no user with this login, 
        // otherwise some user is using this login
        if (shopper === null) {
            let newShopper = new Shopper({username: userName, password: passWord, pw_bcrypt: "", cart: [], purchaseHistory: []});
            newShopper.save((error2, results2) => {
                // account creation was successful
                response.succeeded = true;
            });
        }
        res.json(response);
    });
});

router.post("/login", (req, res) => {
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    let bcrypt_value = req.body.bcryptValue;

    let response = {found: false};
    Shopper.findOneAndUpdate({username: userName, password: passWord}, (err, shopper) => {
        // shopper === null means that there is no user with this username/password combination 
        // otherwise, update the unique shopper's bcrypt value to the one given by the client,
        // and set response.found to true 
        if (shopper !== null) {
            shopper.bcryptValue = bcrypt_value;
            response.found = true;
        }
        res.json(response);
    });
});

// get desired data from desired mongoose Shopper document specified by client-side request
const getShopperData = (req, res, desiredProperty) => {
    let userName = req.query.userName;
    let bcrypt_value = req.query.bcryptValue;

    Shopper.findOne({username: userName, pw_bcrypt: bcrypt_value}).lean().exec((err, shopper) => {
        res.json({[desiredProperty]: shopper[desiredProperty]});
    });
}

router.get("/shopper/cart", (req, res) => {getShopperData(req, res, "cart")});

router.get("/shopper/purchaseHistory", (req, res) => {getShopperData(req, res, "purchaseHistory")});

router.get("/shopper/deleteFromCart", (req, res) => {
    let userName = req.query.userName;
    let bcrypt_value = req.query.bcryptValue;
    let indexDelete = req.query.indexDelete;

    Shopper.findOne({username: userName, pw_bcrypt: bcrypt_value}).lean().exec((err, shopper) => {
        let oldCart = shopper.cart;
        shopper.cart = oldCart.slice(0, indexDelete).concat(oldCart.slice(indexDelete + 1));

        // updatedShopper is the updated version of shopper, and so updatedShopper.cart = newCart
        shopper.save((err, updatedShopper) => res.json({cart: updatedShopper.cart}));
    });
});

// will complete when the purchase page on the client side is planned out 
router.get("/shopper/purchase", (req, res) => {

});


export default router;