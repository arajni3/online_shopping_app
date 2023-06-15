package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

import java.util.List;
import java.util.ArrayList;

public class CartDto {
    private List<String> cart;

    public CartDto() {}
    public CartDto(List<String> cart) {
        this.cart = new ArrayList<>(cart);
    }

    public List<String> getCart() {
        return this.cart;
    }
}