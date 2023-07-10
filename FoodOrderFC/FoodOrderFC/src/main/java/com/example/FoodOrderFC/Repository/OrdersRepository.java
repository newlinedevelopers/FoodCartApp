package com.example.FoodOrderFC.Repository;

import com.example.FoodOrderFC.Entity.OrderToken;
import com.example.FoodOrderFC.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, OrderToken> {
    @Query(value = "SELECT token_generator.nextval FROM dual", nativeQuery = true)
    Long generateToken();
}
