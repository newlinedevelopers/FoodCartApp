package com.example.FoodMenuFC.Services;

import com.example.FoodMenuFC.Entity.MenuCategory;
import com.example.FoodMenuFC.Entity.MenuItem;
import com.example.FoodMenuFC.Model.MenuCategoryModel;
import com.example.FoodMenuFC.Model.MenuItemModel;
import com.example.FoodMenuFC.Repository.MenuCategoryRepository;
import com.example.FoodMenuFC.Repository.MenuItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MenuCategoryServices {
    @Autowired
    MenuCategoryRepository menuCategoryRepository;

    @Autowired
    MenuItemRepository menuItemRepository;

    @Autowired
    private ModelMapper modelMapper;

    public ResponseEntity<String> createNewCategory(MenuCategoryModel menuCategoryModel) {
        MenuCategory menuCategory = modelMapper.map(menuCategoryModel, MenuCategory.class);
        menuCategoryRepository.save(menuCategory);
        return ResponseEntity.ok().body("Menu Category has been successfully created.");
    }

    public ResponseEntity<String> createNewMenuItem(MenuItemModel menuItemModel) {
        MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(menuItemModel.getMenuCategory());

        if(menuCategory != null) {
            MenuItem menuItem = modelMapper.map(menuItemModel, MenuItem.class);
            menuItem.setMenuCategory(menuCategory);
            menuItemRepository.save(menuItem);
            return ResponseEntity.ok().body("Menu Item has been successfully created.");
        }else{
            return ResponseEntity.badRequest().body("The Given category is not existed...");
        }
    }

    public ResponseEntity<String> updateMenuCategory(MenuCategoryModel menuCategoryModel) {
        MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(menuCategoryModel.getId());
        if(menuCategory != null){
            menuCategory = modelMapper.map(menuCategoryModel, MenuCategory.class);
            menuCategoryRepository.save(menuCategory);
            return ResponseEntity.ok().body("Menu Category has been successfully updated.");
        }else {
            return ResponseEntity.badRequest().body("Check your given data is valid");
        }
    }

    public ResponseEntity<String> updateMenuItem(MenuItemModel menuItemModel) {
        MenuItem menuItem = menuItemRepository.findItemsById(menuItemModel.getId());
        MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(menuItemModel.getMenuCategory());

        if (menuItem != null && menuCategory != null) {
            menuItem = modelMapper.map(menuItemModel, MenuItem.class);
            menuItem.setMenuCategory(menuCategory);
            menuItemRepository.save(menuItem);
            return ResponseEntity.ok().body("Menu Item has been successfully updated.");
        } else {
            return ResponseEntity.badRequest().body("Check your given data is valid");
        }
    }

    public ResponseEntity<String> deleteMenuItem(MenuItemModel menuItemModel) {

        MenuItem menuItem = menuItemRepository.findItemsById(menuItemModel.getId());
        if (menuItem != null) {
            menuItemRepository.delete(menuItem);
            return ResponseEntity.ok().body("Menu Item has been successfully deleted.");
        } else {
            return ResponseEntity.badRequest().body("There is no data for the given credentials...");
        }
    }

    public ResponseEntity<List<MenuCategory>> allMenuItems() {
        List<MenuCategory> menuCategory = menuCategoryRepository.findAll();
        return ResponseEntity.ok().body(menuCategory);
    }
}
