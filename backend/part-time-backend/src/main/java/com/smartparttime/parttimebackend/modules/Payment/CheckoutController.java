package com.smartparttime.parttimebackend.modules.Payment;

import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutRequest;
import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;

    @PostMapping
    public CheckoutResponse checkout(@Valid @RequestBody CheckoutRequest request) {
            return checkoutService.checkout(request);
    }

}