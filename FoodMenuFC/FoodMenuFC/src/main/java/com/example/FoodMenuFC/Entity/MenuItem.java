package com.example.FoodMenuFC.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String item_name;

    @Column(nullable = false)
    private Long prize;

    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "category_id")
    private MenuCategory menuCategory;

    @Override
    public String toString() {
        return "MyObject{" +
                "id=" + id +
                ", item_name='" + item_name +
                ", prize=" + prize +
                ", description='" + description +
                '}';
    }
}
