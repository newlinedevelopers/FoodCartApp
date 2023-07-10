package com.example.FoodMenuFC.Model;

import lombok.Data;

@Data
public class MenuItemModel {
    private Long id;
    private String item_name;
    private Long prize;
    private String description;
    private Long menuCategory;
}
