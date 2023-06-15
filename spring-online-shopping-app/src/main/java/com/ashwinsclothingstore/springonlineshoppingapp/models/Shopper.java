package com.ashwinsclothingstore.springonlineshoppingapp.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "shoppers")
public class Shopper {
    @Id
    private String id;

    private String userName;
    private String passWord;
    private String encryptValue;
    private List<String> cart;
    private List<List<String>> purchaseHistory;

    public Shopper () {}
    public Shopper(String userName, String passWord, String encryptValue, List<String> cart, List<List<String>> purchaseHistory) {
        this.userName = userName;
        this.passWord = passWord;
        this.encryptValue = encryptValue;
        this.cart = new ArrayList<>(cart);
        for (List<String> oldCart: purchaseHistory) {
            this.purchaseHistory.add(new ArrayList<>(oldCart));
        }
    }

    public void setEncryptValue(String encryptValue) {
        this.encryptValue = encryptValue;
    }

    public List<String> getCart() {
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

    public List<List<String>> getPurchaseHistory() {
        return this.purchaseHistory;
    }

    public void makePurchase() {
        this.purchaseHistory.add(new ArrayList<>(this.cart));
        this.cart.empty();
    }
}