import express from 'express';
import cors from 'cors';
import shopping from './api/shopping.route.js';

const app = express();

app.use(cors());
app.use(express.json());

// every valid route will start with this route
app.use("/api/v1/shopping", shopping);

// throw 404 error whenever a user uses a route that starts with a different route
app.use("*", (req, res) => res.status(404).json({error: "not found"}));


export default app;