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
        if (!shopper) {
            let newShopper = new Shopper({username: userName, password: passWord, encryptValue: "", cart: [], purchaseHistory: []});
            newShopper.save((error2, results2) => {
                // account creation was successful
                response.succeeded = true;
                res.json(response);
            });
        } else {
            // account creation not successful
            res.json(response);
        }
    });
});

router.post("/login", (req, res) => {
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    let encryptValue;

    bcrypt.hash(passWord, saltRounds, (err, hash) => {
        encryptValue = hash;
        let response = {encryptValue: encryptValue};
        Shopper.findOne({username: userName, password: passWord}, (err, shopper) => {
            // shopper === null means that there is no user with this username/password combination 
            // otherwise, update the unique shopper's bcrypt value to the one given by the client,
            // and set response.encryptValue to the password's bcrypt value
            if (shopper) {
                shopper.encryptValue = encryptValue;
                shopper.save((err2, updatedShopper) => {
                    res.json(response);
                });
            } else {
                res.json(response);
            }
        });
    });   
});


router.get("/shopper/cart", (req, res) => {    
    let userName = req.query.userName;
    let encryptValue = req.query.encryptValue;

    let response = {cart: []};
    Shopper.findOne({username: userName, encryptValue: encryptValue}).lean().exec((err, shopper) => {
        if (shopper) {
            response.cart = shopper.cart;
        }
        res.json(response);
    });
});

router.get("/shopper/purchaseHistory", (req, res) => {
    let userName = req.query.userName;
    let encryptValue = req.query.encryptValue;

    let response = {purchaseHistory: []};
    Shopper.findOne({username: userName, encryptValue: encryptValue}).lean().exec((err, shopper) => {
        if (shopper) {
            response.purchaseHistory = shopper.purchaseHistory;
        }
        res.json(response);
    });
});

router.patch("/shopper/addToCart", (req, res) => {
    let userName = req.body.userName;
    let encryptValue = req.body.encryptValue;
    let type = req.body.type;

    let response = {updatedCart: []};
    Shopper.findOne({username: userName, encryptValue: encryptValue}, (err, shopper) => {
        if (shopper) {
            shopper.cart.push(type);
            shopper.save((err2, updatedShopper) => {
                response.updatedCart = updatedShopper.cart;
                res.json(response);
            });
        } else {
            res.json(response);
        }
    });
});

router.patch("/shopper/deleteFromCart", (req, res) => {
    let userName = req.body.userName;
    let encryptValue = req.body.encryptValue;
    let type = req.body.type;

    let response = {cart: []};
    Shopper.findOne({username: userName, encryptValue: encryptValue}, (err, shopper) => {
        if (shopper) {
            let oldCart = shopper.cart;
            let indexDelete;
    
            // it is guaranteed that a match will be found
            for (indexDelete = 0; indexDelete < oldCart.length; ++indexDelete) {
                if (type === oldCart[indexDelete]) {
                    break;
                }
            }
            shopper.cart = oldCart.slice(0, indexDelete).concat(oldCart.slice(indexDelete + 1));
    
            // save the updated version of the shopper's cart in the response object
            shopper.save((err2, updatedShopper) => {
                response.cart = updatedShopper.cart;
                res.json(response);
            });
        } else {
            res.json(response);
        }
    });
});

router.patch("/shopper/purchase", (req, res) => {
    let userName = req.body.userName;
    let encryptValue = req.body.userName;

    Shopper.findOne({username: userName, encryptValue: encryptValue}, (err, shopper) => {
        if (shopper) {
            if (shopper.cart.length) {
                shopper.purchaseHistory.push(shopper.cart);
            }
            shopper.cart = [];
            
            // save the respective updated versions of the shopper's cart and purchase history
            // in the response object
            shopper.save((err2, updatedShopper) => res.json({succeeded: true}));
        } else {
            res.json({succeeded: false});
        }
    });
});


export default router;