import express from "express";
import dotenv from "dotenv";
import {DynamoDBClient, ScanCommand} from "@aws-sdk/client-dynamodb";

dotenv.config();
const router = express.Router();
const dynamoClient = new DynamoDBClient({region: "us-east-1"});

// get information of each image stored in the S3 bucket
router.get("/imageData", async (req, res) => {
    let response = {imageData: []};
    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE_NAME
    };

    let scanResults = [];
    let items = {};
    do {
        //let command = new ScanCommand(params);
        items = await dynamoClient.send(new ScanCommand(params));
        //items =  await dynamoClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(JSON.parse(JSON.stringify(item))));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    } while(typeof items.LastEvaluatedKey !== "undefined");
    
    response.imageData = scanResults;
    res.json(response);
});

export default router;
