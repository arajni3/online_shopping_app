package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

import com.ashwinsclothingstore.springonlineshoppingapp.models.ShoppingItem;
import java.util.List;
import java.util.ArrayList;

public class ImageDataDto {
    private ArrayList<ShoppingItem> imageData;

    public ImageDataDto() {}
    public ImageDataDto(ArrayList<ShoppingItem> imageData) {
        this.imageData = new ArrayList<>(imageData);
    }
}