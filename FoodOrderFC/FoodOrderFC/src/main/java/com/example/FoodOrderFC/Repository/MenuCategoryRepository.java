package com.example.FoodOrderFC.Repository;

import com.example.FoodOrderFC.Entity.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {
    @Query("select category from MenuCategory category where category.category_id = ?1")
    MenuCategory findByCategoryId(Long categoryId);
}
