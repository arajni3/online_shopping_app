import mongoose from "mongoose";

// encryptValue is the most recent bcrypt value of the shopper's password
const shopperSchema = new mongoose.Schema({
    username: String,
    password: String,
    encryptValue: String,
    cart: [String],
    purchaseHistory: [[String]]
});
let Shopper = mongoose.model("Shopper", shopperSchema);
export default Shopper;