package com.example.FoodOrderFC.EmailServiceFC;

import com.example.FoodOrderFC.Model.EmailModel;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "EmailServiceFC", path = "/emailServiceFC/api")
public interface EmailServices {
    @PostMapping("/emailService")
    public Boolean sendEmail(@RequestBody EmailModel emailModel);
}
