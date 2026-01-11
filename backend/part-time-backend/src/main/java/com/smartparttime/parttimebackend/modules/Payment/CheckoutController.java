package com.smartparttime.parttimebackend.modules.Payment;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.modules.Job.PromoStatus;
import com.smartparttime.parttimebackend.modules.Job.repo.PromotionRepository;
import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutRequest;
import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutResponse;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;
    private final PromotionRepository promotionRepository;

    @Value("${stripe.webhookSecretKey}")
    private String webhookSecretKey;

    @PostMapping
    public CheckoutResponse checkout(@Valid @RequestBody CheckoutRequest request) {
            return checkoutService.checkout(request);
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> handleWebhook(
            @RequestHeader("Stripe-Signature") String signature,
            @RequestBody String payload
    ){
        try {
            var event = Webhook.constructEvent(payload,signature,webhookSecretKey);
            var stripeObject= event.getDataObjectDeserializer().getObject().orElse(null);

            switch(event.getType()){
                case  "payment_intent.succeeded" -> {
                    var paymentIntent=(PaymentIntent)stripeObject;
                    if(paymentIntent!=null){
                        var promoId= paymentIntent.getMetadata().get("promotion_id");
                        var promotion= promotionRepository.findById(UUID.fromString(promoId));
                        promotion.setStatus(PromoStatus.PAID);
                        promotionRepository.save(promotion);
                    }
                }
                case  "payment_intent.failed" -> {

                }
            }
            return  ResponseEntity.ok().build();

        } catch (SignatureVerificationException e) {
            throw  new BadRequestException("Signature verification failed");
        }

    }

}