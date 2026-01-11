package com.smartparttime.parttimebackend.modules.Payment.Service;

import com.smartparttime.parttimebackend.common.exceptions.PaymentException;
import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;
import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class StripePaymentGateway implements PaymentGateway {

    @Value("${websiteUrl}")
    private String websiteUrl;

    @Override
    public CheckoutResponse createCheckoutSession(Promotion promotion) {
        try{
            var builder = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(websiteUrl + "/checkout-success?promotion_id=" + promotion.getId())
                    .setCancelUrl(websiteUrl + "/checkout-cancel")
                    .putMetadata("promotion_id",promotion.getId().toString());

            var lineItem = createLineItem(promotion);
            builder.addLineItem(lineItem);

            var session = Session.create(builder.build()) ;

            return new CheckoutResponse(promotion.getId(),session.getUrl());

        }catch (StripeException e){
            throw new PaymentException("");
        }

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
