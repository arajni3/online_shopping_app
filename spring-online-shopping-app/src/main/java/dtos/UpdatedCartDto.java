package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

public class UpdatedCartDto {
    private List<String> updatedCart;

    public UpdatedCartDto() {}
    public UpdatedCartDto(List<String> updatedCart) {
        this.updatedCart = (List<String>)updatedCart.clone();
    }

    public List<String> getUpdatedCart() {
        return updatedCart;
    }
}
