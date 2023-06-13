package com.ashwinsclothingstore.springonlineshoppingapp.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.ashwinsclothingstore.springonlineshoppingapp.model.Shopper;

public interface ShopperRepository extends MongoRepository<Shopper, String> {
    @Query("{username: '?0', password: '?0'}")
    Shopper findLogin(String username, String password);

    @Query("{username: '?0', encryptValue: '?0'}")
    Shopper findShopper(String username, String encryptValue);
}

