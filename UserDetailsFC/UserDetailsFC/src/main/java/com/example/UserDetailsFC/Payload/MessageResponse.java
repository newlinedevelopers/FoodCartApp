package com.example.UserDetailsFC.Payload;

import lombok.Data;

@Data
public class MessageResponse {
    Boolean isExpired;
    String message;
    public MessageResponse(String message) {
        this.message = message;
    }
    public MessageResponse(Boolean isExpired, String message){
        this.isExpired = isExpired;
        this.message = message;
    }
}
