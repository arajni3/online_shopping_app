package com.ashwinsclothingstore.springonlineshoppingapp.models;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "ashwin_online_shopping_store_image_data")
public class ShoppingItem {
    private String image_description;
    private String image_sthree_key;
    private Double cost;

    public ShoppingItem(String image_description, String image_sthree_key, Double cost) {
        this.image_description = image_description;
        this.image_sthree_key = image_sthree_key;
        this.cost = cost;
    }

    @DynamoDBHashKey(attributeName = "image_description")
    public String getImageDescription() {
        return this.image_description;
    }
    public void setImageDescription(String image_description) {
        this.image_description = image_description;
    }

    @DynamoDBRangeKey(attributeName = "image_sthree_key")
    public String getImageSThreeKey() {
        return this.image_sthree_key;
    }
    public void setImageSThreeKey(String image_sthree_key) {
        this.image_sthree_key = image_sthree_key;
    }

    @DynamoDBAttribute(attributeName = "cost")
    public Double getCost() {
        return this.cost;
    }
    public void setCost(Double cost) {
        this.cost = cost;
    }
}