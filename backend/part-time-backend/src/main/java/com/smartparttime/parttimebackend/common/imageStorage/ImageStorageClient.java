package com.smartparttime.parttimebackend.common.imageStorage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

public interface ImageStorageClient {
    String uploadImage(String containerName, String originalName, InputStream inputStream,String contentType) throws IOException;

}
