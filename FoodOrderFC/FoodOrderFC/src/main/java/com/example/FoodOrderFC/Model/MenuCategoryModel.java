package com.example.FoodOrderFC.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuCategoryModel {
    private Long id;
    private String category_name;
    private List<MenuItemsModel> menuItem;
}
