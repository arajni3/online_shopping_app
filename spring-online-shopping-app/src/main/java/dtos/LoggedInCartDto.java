package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

public class LoggedInCartDto {
    private String userName;
    private String encryptValue;
    private String type;

    public LoggedInCartDto() {}
    public LoggedInCartDto(String userName, String encryptValue, String typr) {
        this.userName = userName;
        this.encryptValue = encryptValue;
        this.type = type;
    }

    public String getUserName() {
        return this.userName;
    }
    public String getEncryptValue() {
        return this.encryptValue;
    }
    public String getType() {
        return this.type;
    }
}