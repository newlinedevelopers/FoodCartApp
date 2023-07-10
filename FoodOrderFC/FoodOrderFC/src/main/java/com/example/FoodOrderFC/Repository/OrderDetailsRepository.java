package com.example.FoodOrderFC.Repository;

import com.example.FoodOrderFC.Entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailsRepository  extends JpaRepository<OrderDetails, Long> {
}
