package com.ashwinsclothingstore.springonlineshoppingapp.dtos;

import java.util.List;
import java.util.ArrayList;

public class PurchaseHistoryDto {
    private List<List<String>> purchaseHistory;

    public PurchaseHistoryDto() {}
    public PurchaseHistoryDto(List<List<String>> purchaseHistory) {
        for (List<String> oldCart: purchaseHistory) {
            this.purchaseHistory.add(new ArrayList<>(oldCart));
        }
    }

    public List<List<String>> getPurchaseHistory() {
        return this.purchaseHistory;
    }
}