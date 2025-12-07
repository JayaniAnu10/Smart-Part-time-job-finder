package com.smartparttime.parttimebackend.common.imageStorage;

import java.io.IOException;
import java.io.InputStream;

public interface ImageStorageClient {
    String uploadImage(String containerName, String originalName, InputStream inputStream,String contentType) throws IOException;

}
