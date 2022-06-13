import app from "./server.js";
import mongodb from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port.env, () => {console.log(`Server is running at port ${port}`)});