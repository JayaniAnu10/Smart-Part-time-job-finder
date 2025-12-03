package com.smartparttime.parttimebackend.modules.Rating;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/ratings")
public class RateController {
   /* private final RateService rateService;

    @PostMapping
    public void submitRate(
            @Valid @RequestBody RatingRequest request
    ){
        rateService.addRate(request);
    }*/
}
