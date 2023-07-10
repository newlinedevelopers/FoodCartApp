package com.example.FoodOrderFC.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemsModel {
    private Long id;
    private String item_name;
    private Long prize;
    private Long quantity;
}
