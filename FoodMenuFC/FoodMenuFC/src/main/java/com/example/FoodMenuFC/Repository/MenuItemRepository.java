package com.example.FoodMenuFC.Repository;

import com.example.FoodMenuFC.Entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    @Query("select mi from MenuItem mi where mi.id = ?1")
    MenuItem findItemsById(Long id);
    @Query("select mi from MenuItem mi where mi.menuCategory.id = ?1")
    List<MenuItem> findItemsByCategoryId(Long category_id);
}
