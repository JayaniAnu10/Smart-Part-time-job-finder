package com.smartparttime.parttimebackend.modules.Admin.service.impl;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminOverviewDto;
import com.smartparttime.parttimebackend.modules.Admin.dto.TopCategoryDto;
import com.smartparttime.parttimebackend.modules.Admin.dto.TrafficDto;
import com.smartparttime.parttimebackend.modules.Admin.repo.AdminAnalyticsRepo;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminAnalyticsServiceImpl implements AdminAnalyticsService {

    @Autowired
    private AdminAnalyticsRepo analyticsRepo;


    @Override
    public AdminOverviewDto getOverview() {

        AdminOverviewDto dto = new AdminOverviewDto();

        dto.setTotalUsers(analyticsRepo.getTotalUsers());
        dto.setTotalEmployers(analyticsRepo.getTotalEmployers());
        dto.setTotalJobSeekers(analyticsRepo.getTotalJobSeekers());

        dto.setTotalJobs(analyticsRepo.getTotalJobs());
        dto.setActiveJobs(analyticsRepo.getActiveJobs());

        dto.setTotalApplications(analyticsRepo.getTotalApplications());

        dto.setTotalPayments(analyticsRepo.getTotalPayments());
        dto.setTotalPaymentAmount(analyticsRepo.getTotalPaymentAmount());

        dto.setTotalComplaints(analyticsRepo.getTotalComplaints());
        dto.setPendingComplaints(analyticsRepo.getPendingComplaints());

        return dto;
    }



    @Override
    public List<TopCategoryDto> getTopCategories() {

        List<Object[]> results = analyticsRepo.getTopCategories();
        List<TopCategoryDto> response = new ArrayList<>();

        for (Object[] row : results) {
            TopCategoryDto dto = new TopCategoryDto();
            dto.setCategory((String) row[0]);
            dto.setCount((Long) row[1]);
            response.add(dto);
        }

        return response;
    }



    @Override
    public List<TrafficDto> getDailyTraffic() {

        List<Object[]> results = analyticsRepo.getDailyTraffic();
        List<TrafficDto> response = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Object[] row : results) {
            TrafficDto dto = new TrafficDto();


            dto.setDate(row[0] != null ? row[0].toString() : "N/A");
            dto.setCount((Long) row[1]);

            response.add(dto);
        }

        return response;
    }
}
