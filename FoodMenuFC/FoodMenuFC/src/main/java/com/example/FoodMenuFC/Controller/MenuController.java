package com.example.FoodMenuFC.Controller;

import com.example.FoodMenuFC.Entity.MenuCategory;
import com.example.FoodMenuFC.Model.MenuCategoryModel;
import com.example.FoodMenuFC.Model.MenuItemModel;
import com.example.FoodMenuFC.Services.MenuCategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menus")
public class MenuController {
    @Autowired
    public MenuCategoryServices menuCategoryServices;

    @GetMapping("/")
    public String createCategory(){
        return "Food Menu";
    }
    @PostMapping("/createCategory")
    public ResponseEntity<?> createCategory(@RequestBody MenuCategoryModel menuCategoryModel){
        ResponseEntity<String> menuCategoryModelResponseEntity = menuCategoryServices.createNewCategory(menuCategoryModel);
        return menuCategoryModelResponseEntity;
    }

    @PostMapping("/createMenuItem")
    public ResponseEntity<?> createMenuItem(@RequestBody MenuItemModel menuItemModel){
        ResponseEntity<String> menuItemModelResponseEntity = menuCategoryServices.createNewMenuItem(menuItemModel);
        return menuItemModelResponseEntity;
    }

    @PutMapping("/updateCategory")
    public ResponseEntity<?> updateCategory(@RequestBody MenuCategoryModel menuCategoryModel){
        ResponseEntity<String> menuCategoryUpdateModel = menuCategoryServices.updateMenuCategory(menuCategoryModel);
        return menuCategoryUpdateModel;
    }

    @PutMapping("/updateMenuItem")
    public ResponseEntity<?> updateMenuItem(@RequestBody MenuItemModel menuItemModel){
        ResponseEntity<String> menuItemUpdateModel = menuCategoryServices.updateMenuItem(menuItemModel);
        return menuItemUpdateModel;
    }

    @DeleteMapping("/deleteItem")
    public ResponseEntity<?> deleteCategory(@RequestBody MenuItemModel menuItemModel){
        ResponseEntity<String> menuItemDeletion = menuCategoryServices.deleteMenuItem(menuItemModel);
        return menuItemDeletion;
    }

    @GetMapping("/getMenus")
    public ResponseEntity<List<MenuCategory>> getAllMenus(){
        ResponseEntity<List<MenuCategory>> getAllMenuItems = menuCategoryServices.allMenuItems();
        return getAllMenuItems;
    }
}
