package com.ashwinsclothingstore.springonlineshoppingapp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Lists;
import java.util.ArrayList;

import com.ashwinsclothingstore.springonlineshoppingapp.models.ShoppingItem;
import com.ashwinsclothingstore.springonlineshoppingapp.repositories.ShoppingItemRepository;
import com.ashwinsclothingstore.springonlineshoppingapp.dtos.ShoppingItemDto;

@CrossOrigin
@RestController
@RequestMapping("/api/v3/aws-requests")
public class ShoppingItemController {
    @Autowired
    private ShoppingItemRepository shoppingItemRepository;

    @GetMapping("/imageData")
    public ResponseEntity<List<ShoppingItemDto>> getShoppingItems() {
        Iterable<ShoppingItem> shoppingItems = shoppingItemRepository.findAll();
        
        ShoppingItemDto shoppingItemDto = new ShoppingItemDto(Lists.newArrayList(shoppingItems));
        return new ResponseEntity<>(shoppingItemDto, HttpStatus.OK);
    }
}