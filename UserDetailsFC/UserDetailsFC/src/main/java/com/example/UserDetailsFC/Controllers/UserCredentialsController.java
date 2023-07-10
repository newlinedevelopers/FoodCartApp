package com.example.UserDetailsFC.Controllers;

import com.example.UserDetailsFC.Models.UserAddressModel;
import com.example.UserDetailsFC.Models.UserCredentialsModel;
import com.example.UserDetailsFC.Service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userDetails")
public class UserCredentialsController {
    @Autowired
    public UserDetailsService userDetailsService;
    @GetMapping("/hello")
    public String hello(){
        return "hello allwin";
    }
    @PostMapping("/createNewUser")
    public ResponseEntity<?> createNewUser(@RequestBody UserCredentialsModel userCredentialsModel){
        ResponseEntity<?> userCredentialsModelResponseEntity = userDetailsService.createUserCredentials(userCredentialsModel);
        return userCredentialsModelResponseEntity;
    }
    @PostMapping("/login")
    public ResponseEntity<?> authToLogin(@RequestBody UserCredentialsModel userCredentialsModel){
        ResponseEntity<?> verifyUserCredentialsResponse = userDetailsService.verifyUserCredentials(userCredentialsModel);
        return verifyUserCredentialsResponse;
    }
    @PostMapping("/profile")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ResponseEntity<?> createAddress(@RequestBody UserAddressModel userAddressModel){
        ResponseEntity<?> createAddressDetails = userDetailsService.createAddressDetailsForUser(userAddressModel);
        return createAddressDetails;
    }
    @GetMapping("/userprofile/{id}")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ResponseEntity<?> getAddress(@PathVariable("id") Long userId){
        ResponseEntity<?> getAddressDetails = userDetailsService.getAddressDetailsForUser(userId);
        return getAddressDetails;
    }
}
