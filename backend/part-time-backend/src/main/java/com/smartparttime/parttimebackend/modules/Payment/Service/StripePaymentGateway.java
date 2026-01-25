package com.smartparttime.parttimebackend.modules.Payment.Service;

import com.smartparttime.parttimebackend.common.exceptions.PaymentException;
import com.smartparttime.parttimebackend.modules.Job.PromoStatus;
import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;
import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutResponse;
import com.smartparttime.parttimebackend.modules.Payment.Dto.PaymentResult;
import com.smartparttime.parttimebackend.modules.Payment.Dto.WebhookRequest;
import com.smartparttime.parttimebackend.modules.Payment.Payment;
import com.smartparttime.parttimebackend.modules.Payment.PaymentStatus;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
public class StripePaymentGateway implements PaymentGateway {

    @Value("${websiteUrl}")
    private String websiteUrl;

    @Value("${stripe.webhookSecretKey}")
    private String webhookSecretKey;

    @Override
    public CheckoutResponse createCheckoutSession(Promotion promotion, Payment payment) {
        try{
            var builder = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(websiteUrl + "/checkout-success?promotion_id=" + promotion.getId())
                    .setCancelUrl(websiteUrl + "/checkout-cancel")
                    .setPaymentIntentData(
                            SessionCreateParams.PaymentIntentData.builder()
                                    .putMetadata("promotion_id", promotion.getId().toString())
                                    .build()
                    );
                    builder.addLineItem(createLineItem(promotion))
                    .build();

            var session = Session.create(builder.build());

            return new CheckoutResponse(promotion.getId(), session.getUrl());

        } catch (StripeException e) {
            throw new PaymentException("Failed to create session: " + e.getMessage());
        }
    }

    @Override
    public Optional<PaymentResult> parseWebhookRequest(WebhookRequest webhookRequest) {
        try {
            var payload= webhookRequest.getPayload();
            var signature= webhookRequest.getHeaders().get("stripe-signature");
            var event = Webhook.constructEvent(payload,signature,webhookSecretKey);

           return switch(event.getType()){
                case  "payment_intent.succeeded" ->
                    Optional.of(new PaymentResult(PaymentStatus.SUCCESS,extractPromotionId(event),PromoStatus.ACTIVE));

                case  "payment_intent.payment_failed" ->
                    Optional.of(new PaymentResult(PaymentStatus.FAILED,extractPromotionId(event),PromoStatus.EXPIRED));

                default ->
                    Optional.empty();
            };

        } catch (SignatureVerificationException e) {
            throw  new PaymentException("Signature verification failed");
        }
    }

    public UUID extractPromotionId(Event event) {
        var stripeObject = event.getDataObjectDeserializer().getObject().orElseThrow(
                () -> new PaymentException("Could not deserialize stripe event")
        );

        var paymentIntent = (PaymentIntent) stripeObject;
        return UUID.fromString(paymentIntent.getMetadata().get("promotion_id"));
    }

    private SessionCreateParams.LineItem createLineItem(Promotion promotion) {
        return SessionCreateParams.LineItem.builder()
                .setPriceData(createPriceData(promotion))
                .setQuantity(1L)
                .build();
    }

    private  SessionCreateParams.LineItem.PriceData createPriceData(Promotion promotion) {
        return SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("lkr")
                .setUnitAmountDecimal(promotion.getCategory().getPrice().multiply(BigDecimal.valueOf(100)))
                .setProductData(createProductData(promotion))
                .build();
    }

    private  SessionCreateParams.LineItem.PriceData.ProductData createProductData(Promotion promotion) {
        return SessionCreateParams.LineItem.PriceData.ProductData.builder()
                .setName(promotion.getJob().getTitle()) // display name
                .build();
    }
}
