package com.smartparttime.parttimebackend.modules.Admin.controller;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminOverviewDto;
import com.smartparttime.parttimebackend.modules.Admin.dto.LocationCountDto;
import com.smartparttime.parttimebackend.modules.Admin.dto.TopCategoryDto;
import com.smartparttime.parttimebackend.modules.Admin.dto.TrafficDto;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/analytics")
public class
AdminAnalyticsController {

    @Autowired
    private AdminAnalyticsService analyticsService;



    @GetMapping("/overview")
    public AdminOverviewDto getOverview() {
        return analyticsService.getOverview();
    }


   //pie chart
    @GetMapping("/top-categories")
    public List<TopCategoryDto> getTopCategories() {
        return analyticsService.getTopCategories();
    }


  //line chart
    @GetMapping("/daily-traffic")
    public List<TrafficDto> getDailyTraffic() {
        return analyticsService.getDailyTraffic();
    }


    @GetMapping("/jobs-by-location")
    public List<LocationCountDto> getJobsByLocation() {
        return analyticsService.getJobsByLocation();
    }



}
