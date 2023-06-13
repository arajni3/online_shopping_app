package com.ashwinsclothingstore.springonlineshoppingapp.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;

@Document(collection = "shoppers")
public class Shopper {
    @Id
    private String id;

    private String userName;
    private String passWord;
    private String encryptValue;
    private ArrayList<String> cart;
    private ArrayList<ArrayList<String>> purchaseHistory;

    public Shopper () {}
    public Shopper(String userName, String passWord, String encryptValue, ArrayList<String> cart, ArrayList<ArrayList<String>> purchaseHistory) {
        this.userName = userName;
        this.passWord = passWord;
        this.encryptValue = encryptValue;
        this.cart = (ArrayList<String>)cart.clone();
        for (List<String> oldCart: purchaseHistory) {
            this.purchaseHistory.add((List<String>)oldCart.clone());
        }
    }

    public void setEncryptValue(String encryptValue) {
        this.encryptValue = encryptValue;
    }

    public ArrayList<String> getCart() {
        return this.cart;
    }
    public void addToCart(String item) {
        this.cart.add(item);
    }
    public void deleteFromCart(String item) {
        this.cart.remove(item);
    }
    public int getCartLength() {
        return this.cart.length;
    }

    public ArrayList<ArrayList<String>> getPurchaseHistory() {
        return this.purchaseHistory;
    }

    public void makePurchase() {
        this.purchaseHistory.add((ArrayList<String>)this.cart.clone());
        this.cart.empty();
    }
}