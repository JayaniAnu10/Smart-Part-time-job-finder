package com.smartparttime.parttimebackend.modules.Admin.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class AdminJobDto {

    private UUID id;


    private String title;


    private String company;


    private String location;


    private String status;


    private String postedDate;
}
