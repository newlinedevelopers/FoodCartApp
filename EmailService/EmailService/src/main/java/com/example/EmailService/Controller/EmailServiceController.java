package com.example.EmailService.Controller;

import com.example.EmailService.EmailContentModel.EmailModel;
import com.example.EmailService.Service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailServiceController {
    @Autowired
    private MailService mailService;
    @PostMapping("/emailService")
    public Boolean sendEmail(@RequestBody EmailModel emailModel){
        return mailService.sendSimpleEmail(emailModel.getToEmail(), emailModel.getBody(), "Ordered items from food cart :)");
    }
}
