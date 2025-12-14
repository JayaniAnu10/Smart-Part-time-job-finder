package com.smartparttime.parttimebackend.modules.Admin.service;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminOverviewDto;
import com.smartparttime.parttimebackend.modules.Admin.dto.TopCategoryDto;
import com.smartparttime.parttimebackend.modules.Admin.dto.TrafficDto;

import java.util.List;

public interface AdminAnalyticsService {


    AdminOverviewDto getOverview();


    List<TopCategoryDto> getTopCategories();


    List<TrafficDto> getDailyTraffic();
}
