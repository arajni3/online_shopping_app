package com.ashwinsclothingstore.springonlineshoppingapp.repositories;

import org.springframework.data.repository.CrudRepository;
import com.ashwinsclothingstore.springonlineshoppingapp.models.ShoppingItem;

public interface ShoppingItemRepository extends CrudRepository<ShoppingItem, String> {
    
}