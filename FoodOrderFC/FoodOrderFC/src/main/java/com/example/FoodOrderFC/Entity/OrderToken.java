package com.example.FoodOrderFC.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderToken implements Serializable {
    @Column(name = "user_id", nullable = false)
    private Long user_id;

    @Column(name = "token_number", nullable = false)
    private Long token_number;
}
