package com.example.FoodMenuFC.Model;

import com.example.FoodMenuFC.Entity.MenuItem;
import lombok.Data;
import java.util.List;

@Data
public class MenuCategoryModel {
    private Long id;
    private String category_name;
    private List<MenuItem> menuItem;
}
