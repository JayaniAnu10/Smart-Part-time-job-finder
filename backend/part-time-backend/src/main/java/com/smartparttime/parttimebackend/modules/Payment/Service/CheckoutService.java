package com.smartparttime.parttimebackend.modules.Payment.Service;

import com.smartparttime.parttimebackend.common.Services.EmailService;
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
import com.smartparttime.parttimebackend.modules.Payment.Payment;
import com.smartparttime.parttimebackend.modules.Payment.PaymentRepository;
import com.smartparttime.parttimebackend.modules.Payment.PaymentStatus;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class CheckoutService {
    private final JobRepo jobRepo;
    private final PromotionCategoryRepository promotionCategoryRepository;
    private final PromotionRepository promotionRepository;
    private final PaymentGateway paymentGateway;
    private final PaymentRepository paymentRepository;
    private final EmailService emailService;


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

        Payment payment = new Payment();
        payment.setPayer(job.getEmployer().getUser());
        payment.setReceiver(job.getEmployer().getUser());
        payment.setAmount(category.getPrice());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setPaymentDate(LocalDateTime.now());

        var savedPayment=paymentRepository.save(payment);

        Promotion promotion = new Promotion();
        promotion.setCategory(category);
        promotion.setJob(job);
        promotion.setStartedDate(LocalDateTime.now());
        promotion.setExpiryDate(LocalDateTime.now().plusDays(category.getDays()));
        promotion.setStatus(PromoStatus.PENDING);
        promotion.setPayment(savedPayment);
        var saved = promotionRepository.save(promotion);



        try{
            var session =paymentGateway.createCheckoutSession(saved,savedPayment);
            return new CheckoutResponse(promotion.getId(),session.getCheckoutUrl());
        }catch (PaymentException e){
            promotionRepository.delete(promotion);
            throw e;
        }
    }

    @Transactional
    public void handleWebhookEvent(WebhookRequest request){
        paymentGateway
                .parseWebhookRequest(request)
                .ifPresent(paymentResult -> {
                    var promotion= promotionRepository.findById(paymentResult.getPromotionId()).orElseThrow();
                    promotion.setStatus(paymentResult.getPromoStatus());
                    promotionRepository.save(promotion);

                    Payment payment = promotion.getPayment();
                    System.out.println(payment);
                    if (payment != null) {
                        payment.setStatus(paymentResult.getPaymentStatus());
                        paymentRepository.save(payment);
                        System.out.println("success1");
                        String email = payment.getPayer().getEmail();
                        if (paymentResult.getPaymentStatus() == PaymentStatus.SUCCESS) {
                            emailService.sendPaymentSuccessEmail(email, promotion);
                            System.out.println("success");
                        } else if (paymentResult.getPaymentStatus() == PaymentStatus.FAILED) {
                            emailService.sendPaymentFailedEmail(email, promotion);
                        }
                    }
                });

    }
}
