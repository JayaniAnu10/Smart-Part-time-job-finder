package com.smartparttime.parttimebackend.modules.Payment;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.PaymentException;
import com.smartparttime.parttimebackend.modules.Job.PromoStatus;
import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.Job.repo.PromotionCategoryRepository;
import com.smartparttime.parttimebackend.modules.Job.repo.PromotionRepository;
import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutRequest;
import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutResponse;
import com.smartparttime.parttimebackend.modules.Payment.Dto.WebhookRequest;
import com.smartparttime.parttimebackend.modules.Payment.Service.PaymentGateway;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class CheckoutService {
    private final JobRepo jobRepo;
    private final PromotionCategoryRepository promotionCategoryRepository;
    private final PromotionRepository promotionRepository;
    private final PaymentGateway paymentGateway;


    @Transactional
    public CheckoutResponse checkout(@Valid CheckoutRequest request) {
        var job= jobRepo.findById(request.getJobId()).orElse(null);
        if(job==null){
            throw new BadRequestException("Job Not Found");
        }

        var category= promotionCategoryRepository.findById(request.getPromotionCategoryId()).orElse(null);

        if(category==null){
            throw new BadRequestException("Promotion Category Not Found");
        }

        Promotion promotion = new Promotion();
        promotion.setCategory(category);
        promotion.setJob(job);
        promotion.setStartedDate(LocalDateTime.now());
        promotion.setExpiryDate(LocalDateTime.now().plusDays(category.getDays()));
        var saved = promotionRepository.save(promotion);

        try{
            var session =paymentGateway.createCheckoutSession(saved);
            return new CheckoutResponse(promotion.getId(),session.getCheckoutUrl());
        }catch (PaymentException e){
            promotionRepository.delete(promotion);
            throw e;
        }
    }

    public void handleWebhookEvent(WebhookRequest request){
        paymentGateway
                .parseWebhookRequest(request)
                .ifPresent(paymentResult -> {
                    var promotion= promotionRepository.findById(paymentResult.getPromotionId());
                    promotion.setStatus(paymentResult.getPaymentStatus());
                    promotionRepository.save(promotion);
                });

    }
}
