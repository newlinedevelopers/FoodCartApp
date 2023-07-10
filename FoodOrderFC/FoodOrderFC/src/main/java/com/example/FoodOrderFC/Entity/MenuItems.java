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
public class MenuItems {
    @Id
    private Long item_id;

    private String item_name;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category")
    private MenuCategory menuItemCategory;

    @JsonIgnore
    @OneToMany(mappedBy = "menuItem", fetch = FetchType.LAZY)
    private List<OrderDetails> orderDetails;

    @Override
    public String toString() {
        return "MenuItems{" +
                "item_id=" + item_id +
                ", item_name='" + item_name + '\'' +
                '}';
    }
}
