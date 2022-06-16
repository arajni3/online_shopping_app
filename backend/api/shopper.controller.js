import mongodb from "mongodb";
import mongoose from "mongoose";

// pw_bcrypt is the bcrypt value of the shopper's password
const shopperSchema = new mongoose.Schema({
    username: String,
    password: String,
    pw_bcrypt: String,
    cart: [String],
    purchaseHistory: [[String]]
});
let Shopper = mongoose.Model("Shopper", ShopperSchema);
export default Shopper;