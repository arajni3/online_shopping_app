import express from 'express';
import cors from 'cors';
import shopping from './api/route_handlers/shopping.route.js';
import aws from './api/route_handlers/aws.route.js';
import * as path from "path";
import {fileURLToPath} from 'url';
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// every valid route will start with this route
app.use("/api/v2/shopping", shopping);
app.use("/api/v2/aws-requests", aws);
// throw 404 error whenever a user uses a route that starts with a different route
//app.use("*", (req, res) => res.status(404).json({error: "not found"}));


if (process.env.NODE_ENV === 'production') {
    // serve static build
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    // return the frontend when any route other than the endpoint listed above is not hit
    app.get('*', (req, res) => {
        console.log("wildcard");
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}

export default app;