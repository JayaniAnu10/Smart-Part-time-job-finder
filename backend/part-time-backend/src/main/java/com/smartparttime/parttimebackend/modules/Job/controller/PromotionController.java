package com.smartparttime.parttimebackend.modules.Job.controller;

import com.smartparttime.parttimebackend.modules.Job.entity.PromotionCategory;
import com.smartparttime.parttimebackend.modules.Job.repo.PromotionCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/promotions")
@AllArgsConstructor
public class PromotionController {
    private final PromotionCategoryRepository promotionCategoryRepository;

    @GetMapping
    public List<PromotionCategory> getPromoCategories(){
        return promotionCategoryRepository.findAll();
    }
}
