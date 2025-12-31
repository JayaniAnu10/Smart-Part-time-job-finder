package com.smartparttime.parttimebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PartTimeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PartTimeBackendApplication.class, args);
    }

}
