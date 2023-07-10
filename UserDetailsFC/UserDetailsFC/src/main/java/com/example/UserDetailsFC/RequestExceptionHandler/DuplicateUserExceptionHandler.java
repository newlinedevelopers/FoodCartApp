package com.example.UserDetailsFC.RequestExceptionHandler;

public class DuplicateUserExceptionHandler extends RuntimeException {
    private final String errorMessage;
    public DuplicateUserExceptionHandler(String errorMessage) {
        this.errorMessage = errorMessage;
    }
    public String getErrorMessage() {
        return errorMessage;
    }
}

