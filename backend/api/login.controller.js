import mongodb from "mongodb";
import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
    bcryptValue: String,
});
let Login = mongoose.Model("Login", loginSchema);
export default Login;