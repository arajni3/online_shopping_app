package com.ashwinsclothingstore.springonlineshoppingapp.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

import com.ashwinsclothingstore.springonlineshoppingapp.models.Shopper;
import com.ashwinsclothingstore.springonlineshoppingapp.repositories.ShopperRepository;
import com.ashwinsclothingstore.springonlineshoppingapp.dtos.*;
import com.ashwinsclothingstore.springonlineshoppingapp.passwordencoder.BPasswordEncoder;

@CrossOrigin
@RestController
@RequestMapping("/api/v3/shopping")
public class ShopperController {
    @Autowired
    private ShopperRepository shopperRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/createAccount")
    public ResponseEntity<SucceededDto> createAccount(@RequestBody AccountDto body) {
        Shopper shopper = this.shopperRepository.findShopper(body.getUserName(), body.getPassWord());
        
        SucceededDto succeededDto;
        if (shopper == null) {
            this.shopperRepository.save(new Shopper(body.getUserName(), body.getPassWord(), new ArrayList<String>(), new ArrayList<ArrayList<String>>()));
            succeededDto = new SucceededDto(true);
        } else {
            succeededDto = new SucceededDto(false);
        }
        return new ResponseEntity<>(succeededDto, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<EncryptValueDto> signIn(@RequestBody AccountDto body) {
        Shopper shopper = this.shopperRepository.findShopper(body.getUserName(), body.getPassWord());

        EncryptValueDto encryptValueDto;
        if (shopper == null) {
            encryptValueDto = new EncryptValueDto("");
        } else {
            String encryptValue = bCryptPasswordEncoder.encode(body.getPassWord());
            shopper.setEncryptValue(encryptValue);
            this.shopperRepository.save(shopper);
            encryptValueDto = new EncryptValueDto(encryptValue);
        }
        return new ResponseEntity<>(encryptValueDto, HttpStatus.OK);
    }

    @GetMapping("/shopper/cart")
    public ResponseEntity<CartDto> getCart(@RequestParam String userName, @RequestParam String encryptValue) {
        Shopper shopper = this.shopperRepository.findShopper(userName, encryptValue);
        CartDto cartDto = new CartDto(shopper.getCart());
        return new ResponseEntity<>(cartDto, HttpStatus.OK);
    }

    @GetMapping("/shopper/purchaseHistory")
    public ResponseEntity<PurchaseHistoryDto> getPurchaseHistory(@RequestParam String userName, @RequestParam String encryptValue) {
        Shopper shopper = this.shopperRepository.findShopper(userName, encryptValue);
        PurchaseHistoryDto purchaseHistoryDto = new PurchaseHistoryDto(shopper.getPurchaseHistory());
        return new ResponseEntity<>(purchaseHistoryDto, HttpStatus.OK);
    }

    @PatchMapping("/shopper/addToCart")
    public ResponseEntity<UpdatedCartDto> addToCart(@RequestBody LoggedInCartDto body) {
        Shopper shopper = this.shopperRepository.findShopper(body.getUserName(), body.getEncryptValue());
        shopper.addToCart(body.getType());

        Shopper updatedShopper = this.shopperRepository.save(shopper);
        UpdatedCartDto updatedCartDto = new UpdatedCartDto(updatedShopper.getCart());
        return new ResponseEntity<>(updatedCartDto, HttpStatus.OK);
    }

    @PatchMapping("/shopper/deleteFromCart")
    public ResponseEntity<UpdatedCartDto> deleteFromCart(@RequestBody LoggedInCartDto body) {
        Shopper shopper = this.shopperRepository.findShopper(body.getUserName(), body.getEncryptValue());
        shopper.deleteFromCart(body.getType());

        Shopper updatedShopper = this.shopperRepository.save(shopper);
        UpdatedCartDto updatedCartDto = new UpdatedCartDto(updatedShopper.getCart());
        return new ResponseEntity<>(updatedCartDto, HttpStatus.OK);
    }

    @PatchMapping("/shopper/purchase")
    public ResponseEntity<SucceededDto> makePurchase(@RequestBody LoggedInDto body) {
        Shopper shopper = this.shopperRepository.findShopper(body.getUserName(), body.getEncryptValue());
        
        SucceededDto succeededDto;
        if (shopper.getCartLength()) {
            shopper.makePurchase();
            this.shopperRepository.save(shopper);
            succeededDto = new SucceededDto(true);
        } else {
            succeededDto = new SucceededDto(false);
        }
        return new ResponseEntity<>(succeededDto, HttpStatus.OK);
    }
}
