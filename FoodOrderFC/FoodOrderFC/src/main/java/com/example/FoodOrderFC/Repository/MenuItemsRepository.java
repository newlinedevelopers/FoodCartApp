package com.example.FoodOrderFC.Repository;

import com.example.FoodOrderFC.Entity.MenuItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuItemsRepository  extends JpaRepository<MenuItems, Long> {
    @Query("select menu from MenuItems menu where menu.item_id = ?1")
    MenuItems findMenuItemsById(Long itemId);
}
