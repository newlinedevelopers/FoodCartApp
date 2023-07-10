package com.example.FoodOrderFC.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuCategory {
    @Id
    private Long category_id;

    private String category_name;

    @JsonIgnore
    @OneToMany(mappedBy = "menuCategory", fetch = FetchType.LAZY)
    private List<OrderDetails> orderDetails;

    @OneToMany(mappedBy = "menuItemCategory", fetch = FetchType.LAZY)
    private List<MenuItems> menuItems;

    @Override
    public String toString() {
        return "MenuCategory{" +
                "category_id=" + category_id +
                ", category_name='" + category_name + '\'' +
                ", menuItems=" + menuItems +
                '}';
    }
}
