package com.smartparttime.parttimebackend.modules.Job.controller;

import com.smartparttime.parttimebackend.modules.Job.dto.PromotionSuccessResponse;
import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;
import com.smartparttime.parttimebackend.modules.Job.entity.PromotionCategory;
import com.smartparttime.parttimebackend.modules.Job.mappers.PromotionMapper;
import com.smartparttime.parttimebackend.modules.Job.repo.PromotionCategoryRepository;
import com.smartparttime.parttimebackend.modules.Job.repo.PromotionRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/promotions")
@AllArgsConstructor
public class PromotionController {
    private final PromotionCategoryRepository promotionCategoryRepository;
    private final PromotionRepository promotionRepository;
    private final PromotionMapper promotionMapper;

    @GetMapping
    public List<PromotionCategory> getPromoCategories(){
        return promotionCategoryRepository.findAll();
    }

    @GetMapping("/{id}/success-details")
    public PromotionSuccessResponse getSuccessDetails(@PathVariable UUID id) {
        Promotion promotion = promotionRepository.findById(id).orElseThrow();

        return (promotionMapper.toSuccess(promotion));
    }
}
