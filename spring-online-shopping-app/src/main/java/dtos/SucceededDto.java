package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

public class SucceededDto {
    private boolean succeeded;

    public SucceededDto() {}
    public SucceededDto(boolean succeeded) {
        this.succeeded = succeeded;
    }

    public boolean getSucceeded() {
        return this.succeeded;
    }
}