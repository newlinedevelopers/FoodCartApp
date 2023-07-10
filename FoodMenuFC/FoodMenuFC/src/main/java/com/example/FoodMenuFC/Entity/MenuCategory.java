package com.example.FoodMenuFC.Entity;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String category_name;

    @OneToMany(mappedBy = "menuCategory")
    private List<MenuItem> menuItem;

    @Override
    public String toString() {
        return "MyObject{" +
                "id=" + id +
                ", category_name='" + category_name +
                '}';
    }
}
