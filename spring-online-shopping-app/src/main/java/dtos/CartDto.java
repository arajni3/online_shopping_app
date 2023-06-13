package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

import java.util.List;

public class CartDto {
    private List<String> cart;

    public CartDto() {}
    public CartDto(List<String> cart) {
        this.cart = (List<String>)cart.clone();
    }

    public List<String> getCart() {
        return this.cart;
    }
}