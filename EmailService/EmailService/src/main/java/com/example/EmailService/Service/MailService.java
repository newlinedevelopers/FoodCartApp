package com.example.EmailService.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public boolean sendSimpleEmail(String toEmail, String body, String subject){
        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom("Give your mail");
            message.setTo(toEmail);
            message.setText(body);
            message.setSubject(subject);

            javaMailSender.send(message);
            return true;
        }catch (MailException e){
            e.printStackTrace();
            return false;
        }
    }
}
