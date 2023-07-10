package com.example.UserDetailsFC.Models;

import com.example.UserDetailsFC.Entities.UserCredentials;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAddressModel {
    private Long userId;
    private String firstname;
    private String lastname;
    private String primary_mobile_number;
    private String secondary_mobile_number;
    private String country;
    private String region;
    private String city;
    private String street;
    private String postal_code;
}
