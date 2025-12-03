package com.smartparttime.parttimebackend.modules.Rating;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.Job.JobRepository;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

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
