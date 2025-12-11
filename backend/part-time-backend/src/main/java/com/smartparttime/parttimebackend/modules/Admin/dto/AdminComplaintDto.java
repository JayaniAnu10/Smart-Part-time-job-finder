package com.smartparttime.parttimebackend.modules.Admin.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class AdminComplaintDto {

    private UUID id;
    private String description;
    private String createdAt;
    private String status;

    private String type;

    private UUID reporterId;
    private String reporterName;
    private String reporterEmail;

    private UUID targetId;
    private String targetName;
    private String targetEmail;
}
