package com.example.FoodOrderFC.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsModel {
    private Long id;
    private Long token_number;
    private Long user_id;
    private Long category_id;
    private String category_name;
    private Long item_id;
    private String item_name;
    private Long quantity;
    private Long prize;
    private LocalDate order_date;
}
