package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

public class EncryptValueDto {
    private String encryptValue;

    public EncryptValueDto() {}
    public EncryptValueDto(String encryptValue) {
        this.encryptValue = encryptValue;
    }

    public String getEncryptValue() {
        return this.encryptValue;
    }
}