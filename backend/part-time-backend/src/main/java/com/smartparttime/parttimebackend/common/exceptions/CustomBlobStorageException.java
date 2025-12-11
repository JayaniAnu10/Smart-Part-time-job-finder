package com.smartparttime.parttimebackend.common.exceptions;

public class CustomBlobStorageException extends RuntimeException {
    public CustomBlobStorageException(String message) {
        super(message);
    }
}
