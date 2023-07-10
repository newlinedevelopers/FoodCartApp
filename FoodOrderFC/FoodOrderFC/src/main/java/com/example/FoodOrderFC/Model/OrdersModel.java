package com.example.FoodOrderFC.Model;

import com.example.FoodOrderFC.Entity.MenuCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersModel {
    private Long id;
    private Long token_number;
    private Long user_id;
    private MenuCategory menuCategory;
}
