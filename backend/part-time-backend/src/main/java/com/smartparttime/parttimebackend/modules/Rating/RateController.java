package com.smartparttime.parttimebackend.modules.Rating;

import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingRequest;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingResponse;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingUpdateRequest;
import com.smartparttime.parttimebackend.modules.Rating.service.RateService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

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

    @GetMapping("/{id}")
    public RatingResponse getRateById(
            @PathVariable UUID id){
        return rateService.getRateById(id);
    }

    @GetMapping("/job/{id}")
    public Page<RatingResponse> getRateByJobId(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return rateService.getRatesByJob(id,page,size);
    }

    @GetMapping("/user/{id}") //Get the rates that are received by the user id.
    public Page<RatingResponse> getRateByUser(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return rateService.getRatesByUser(id,page,size);
    }


    @GetMapping("/rater/{id}") //Get the rates that are given to another by the rater id.
    public Page<RatingResponse> getRateByRater(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return rateService.getRatesByRater(id,page,size);
    }

    @PatchMapping
    public RatingResponse updateRate(@Valid @RequestBody RatingUpdateRequest request){
        return rateService.updateRate(request);
    }

    @GetMapping("/user/{id}/average")
    public BigDecimal getAverageRateOfUser(@PathVariable UUID id){
        return rateService.getAverageRateOfUser(id);
    }

    @DeleteMapping("/user/{userId}/{id}")
    public ResponseEntity<Void> deleteRate(
            @PathVariable UUID userId,
            @PathVariable UUID id
    ){
        return rateService.deleteRateById(userId,id);
    }

}
