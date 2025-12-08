package com.smartparttime.parttimebackend.modules.Rating;

import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingRequest;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingResponse;
import com.smartparttime.parttimebackend.modules.Rating.service.RateService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/ratings")
public class RateController {
   private final RateService rateService;

    @PostMapping
    public RatingResponse submitRate(
            @Valid @RequestBody RatingRequest request
    ){
        return rateService.addRate(request);
    }
}
