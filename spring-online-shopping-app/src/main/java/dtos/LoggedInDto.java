package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

public class LoggedInDto {
    private String userName;
    private String encryptValue;

    public LoggedInDto() {}
    public LoggedInDto(String userName, String encryptValue) {
        this.userName = userName;
        this.encryptValue = encryptValue;
    }

    public String getUserName() {
        return this.userName;
    }
    public String getEncryptValue() {
        return this.encryptValue;
    }
}