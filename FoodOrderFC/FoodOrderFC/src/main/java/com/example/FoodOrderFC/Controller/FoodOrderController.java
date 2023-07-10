package com.example.FoodOrderFC.Controller;

import com.example.FoodOrderFC.Model.MenuCategoryModel;
import com.example.FoodOrderFC.Services.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("orders")
public class FoodOrderController {
    @Autowired
    OrderServices orderServices;

    @PostMapping("/saveOrderedItems")
    public ResponseEntity<?> saveOrderedItems(@RequestBody List<MenuCategoryModel> menuCategoryModel, @RequestHeader("loggedInUserId") String userId, @RequestHeader("username") String username){
        ResponseEntity<?> saveOrders = orderServices.saveOrderedMenus(menuCategoryModel, userId, username);
        return saveOrders;
    }

    @GetMapping("/orderDetails")
    public ResponseEntity<?> getAllOrders(){
        ResponseEntity<?> allOrders = orderServices.getAllOrderDetails();
        return allOrders;
    }

}
