package com.example.FoodMenuFC.Repository;

import com.example.FoodMenuFC.Entity.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {
    @Query("Select mc from MenuCategory mc where id = ?1")
    MenuCategory findByCategoryId(Long menuCategory);
}
