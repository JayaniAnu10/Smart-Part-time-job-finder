package com.smartparttime.parttimebackend.modules.Admin.dto;

import lombok.Data;

@Data
public class AdminOverviewDto {


    private long totalUsers;
    private long totalEmployers;
    private long totalJobSeekers;


    private long totalJobs;
    private long activeJobs;

    private long totalApplications;

    private long totalPayments;
    private double totalPaymentAmount;


    private long totalComplaints;
    private long pendingComplaints;
}
