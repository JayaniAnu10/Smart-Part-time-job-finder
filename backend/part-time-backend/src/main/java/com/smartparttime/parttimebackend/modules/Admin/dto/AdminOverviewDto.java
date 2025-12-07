package com.smartparttime.parttimebackend.modules.Admin.dto;

import lombok.Data;

@Data
public class AdminOverviewDto {
    private long totalUsers;
    private long totalJobs;
    private long totalApplications;
    private long totalPayments;
}
