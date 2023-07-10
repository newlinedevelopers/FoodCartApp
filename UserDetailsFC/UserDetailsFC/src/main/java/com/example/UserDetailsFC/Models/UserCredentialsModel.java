package com.example.UserDetailsFC.Models;

import com.example.UserDetailsFC.Entities.UserAddressDetails;
import com.example.UserDetailsFC.Entities.UserRolesFC;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCredentialsModel {
    private Long id;
    private String username;
    private char[] password;
    private UserAddressDetails userAddressDetails;
    private UserRolesFC userRolesFC;
}
