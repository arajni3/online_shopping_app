package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

import java.util.List;
import java.util.ArrayList;

public class UpdatedCartDto {
    private List<String> updatedCart;

    public UpdatedCartDto() {}
    public UpdatedCartDto(List<String> updatedCart) {
        this.updatedCart = new ArrayList<>(updatedCart);
    }

    public List<String> getUpdatedCart() {
        return updatedCart;
    }
}
