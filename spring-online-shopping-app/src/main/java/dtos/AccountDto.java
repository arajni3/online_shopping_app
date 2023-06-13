package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

public class AccountDto {
    private String userName;
    private String passWord;

    public AccountDto () {}
    public AccountDto(String userName, String passWord) {
        this.userName = userName;
        this.passWord = passWord;
    }

    public String getUserName() {
        return this.userName;
    }
    public String getPassWord() {
        return this.passWord;
    }
}