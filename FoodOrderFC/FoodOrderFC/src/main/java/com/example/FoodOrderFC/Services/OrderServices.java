package com.example.FoodOrderFC.Services;

import com.example.FoodOrderFC.EmailServiceFC.EmailServices;
import com.example.FoodOrderFC.Entity.*;
import com.example.FoodOrderFC.Model.EmailModel;
import com.example.FoodOrderFC.Model.MenuCategoryModel;
import com.example.FoodOrderFC.Model.MenuItemsModel;
import com.example.FoodOrderFC.Model.OrderDetailsModel;
import com.example.FoodOrderFC.Repository.MenuCategoryRepository;
import com.example.FoodOrderFC.Repository.MenuItemsRepository;
import com.example.FoodOrderFC.Repository.OrderDetailsRepository;
import com.example.FoodOrderFC.Repository.OrdersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MenuCategoryRepository menuCategoryRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private EmailServices emailServices;

    @Autowired
    private MenuItemsRepository menuItemsRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    public ResponseEntity<?> saveOrderedMenus(List<MenuCategoryModel> menuCategoryModels, String user_id, String username) {
        StringBuilder sb = new StringBuilder();
        Long toTalPrize = 0L;
        LocalDate currentDate = LocalDate.now();
        Long tokenNumber = ordersRepository.generateToken();
        Long userId = Long.valueOf(user_id);
        Orders order = new Orders();
        OrderToken orderToken = new OrderToken(userId, tokenNumber);
        order.setOrderToken(orderToken);
        order = ordersRepository.save(order);

        for (MenuCategoryModel menuCategoryModel : menuCategoryModels) {

            MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(menuCategoryModel.getId());
            if(menuCategory == null){
                menuCategory = new MenuCategory();
                menuCategory.setCategory_id(menuCategoryModel.getId());
                menuCategory.setCategory_name(menuCategoryModel.getCategory_name());
                menuCategory = menuCategoryRepository.save(menuCategory);
            }else{
                menuCategory.setCategory_id(menuCategoryModel.getId());
                menuCategory.setCategory_name(menuCategoryModel.getCategory_name());
                menuCategory = menuCategoryRepository.save(menuCategory);
            }

            for (MenuItemsModel menuItemModel : menuCategoryModel.getMenuItem()) {
                MenuItems menuItem = menuItemsRepository.findMenuItemsById(menuItemModel.getId());

                if(menuItem == null){
                    menuItem = new MenuItems();
                    menuItem.setItem_id(menuItemModel.getId());
                    menuItem.setItem_name(menuItemModel.getItem_name());
                    menuItem.setMenuItemCategory(menuCategory);
                    menuItem = menuItemsRepository.save(menuItem);
                }else {
                    menuItem.setItem_name(menuItemModel.getItem_name());
                    menuItem.setMenuItemCategory(menuCategory);
                    menuItem = menuItemsRepository.save(menuItem);
                }

                sb.append("Item: ").append(menuItemModel.getItem_name()).append("\t");
                sb.append("Quantity: ").append(menuItemModel.getQuantity()).append("\t");
                sb.append("Prize: ₹").append(menuItemModel.getPrize()).append("\t");
                sb.append("\n");

                OrderDetails orderDetails = new OrderDetails();
                orderDetails.setOrder(order);
                orderDetails.setMenuCategory(menuCategory);
                orderDetails.setMenuItem(menuItem);
                orderDetails.setPrize(menuItemModel.getPrize());
                orderDetails.setOrder_date(currentDate);
                orderDetails.setQuantity(menuItemModel.getQuantity());

                toTalPrize += (menuItemModel.getPrize() * menuItemModel.getQuantity());

                orderDetailsRepository.save(orderDetails);
            }
        }
        sb.append("\t").append("\t").append("Total Prize: ₹").append(toTalPrize).append("\n");
        if(toTalPrize >= 1000){
            toTalPrize -= toTalPrize / 10;
            sb.append("You have purchased over 1000...").append("\n");
            sb.append("\t").append("\t").append("After 10% Offer - Prize: ₹").append(toTalPrize).append("\n");
        }
        EmailModel emailModel = new EmailModel();
        emailModel.setToEmail(username);
        emailModel.setBody(sb.toString());
        emailServices.sendEmail(emailModel);
        return ResponseEntity.ok().body("The orders have been stored successfully.");
    }

    public ResponseEntity<List<OrderDetailsModel>> getAllOrderDetails(){
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        List<OrderDetailsModel> orderDetailsDTOList = new ArrayList<>();

        for (OrderDetails orderDetails : orderDetailsList) {
            OrderDetailsModel orderDetailsDTO = new OrderDetailsModel();
            orderDetailsDTO.setId(orderDetails.getId());
            orderDetailsDTO.setToken_number(orderDetails.getOrder().getOrderToken().getToken_number());
            orderDetailsDTO.setUser_id(orderDetails.getOrder().getOrderToken().getUser_id());
            orderDetailsDTO.setCategory_id(orderDetails.getMenuCategory().getCategory_id());
            orderDetailsDTO.setCategory_name(orderDetails.getMenuCategory().getCategory_name());
            orderDetailsDTO.setItem_id(orderDetails.getMenuItem().getItem_id());
            orderDetailsDTO.setItem_name(orderDetails.getMenuItem().getItem_name());
            orderDetailsDTO.setPrize(orderDetails.getPrize());
            orderDetailsDTO.setQuantity(orderDetails.getQuantity());
            orderDetailsDTO.setOrder_date(orderDetails.getOrder_date());

            orderDetailsDTOList.add(orderDetailsDTO);
        }

        return ResponseEntity.ok().body(orderDetailsDTOList);
    }
}
