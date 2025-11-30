package com.smartparttime.parttimebackend.modules.User.UserExceptions;

public class PasswordMismatchException extends RuntimeException {
    public PasswordMismatchException(String message) {
        super(message);
    }
}
