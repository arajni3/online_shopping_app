import mongodb from "mongodb";
import mongoose from "mongoose";

// pw_bcrypt is the bcrypt value of the shopper's password.
// We store the password only in the Login collection and use the bcrypt value everywhere else
// instead of the password since there is a one-to-one correspondence between a password and 
// its bcrypt value provided that the bcrypt value of the password of a shopper s computed only once. 
// The bcrypt value is indeed computed only once, which is during account creation.
const shopperSchema = new mongoose.Schema({
    username: String,
    pw_bcrypt: String,
    cart: [String],
    purchaseHistory: [[String]]
});
let Shopper = mongoose.Model("Shopper", ShopperSchema);
export default Shopper;