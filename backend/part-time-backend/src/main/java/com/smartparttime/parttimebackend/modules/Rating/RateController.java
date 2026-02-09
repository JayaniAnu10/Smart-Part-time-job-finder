package com.smartparttime.parttimebackend.modules.Rating;

import com.smartparttime.parttimebackend.modules.Rating.RateDtos.*;
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
   private final RateRepository rateRepository;

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
    public UserAverageRateResponse getAverageRateOfUser(@PathVariable UUID id){

        return rateService.getAverageRateOfUser(id);
    }

    @DeleteMapping("/user/{userId}/{id}")
    public ResponseEntity<Void> deleteRate(
            @PathVariable UUID userId,
            @PathVariable UUID id
    ){
        return rateService.deleteRateById(userId,id);
    }

    @GetMapping("/user/{id}/details")
    public Page<RatingWithDetailsResponse> getRatingsByUserWithDetails(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return rateService.getRatingsByUserWithDetails(id, page, size);
    }

    @GetMapping("/check")
    public ResponseEntity<RatingResponse> getRatingByRaterReceiverAndJob(
            @RequestParam UUID raterId,
            @RequestParam UUID rateReceiverId,
            @RequestParam UUID jobId
    ){
        Rate rate = rateRepository.findByRateReceiver_IdAndRater_IdAndJob_Id(
                rateReceiverId, raterId, jobId
        );

        if (rate == null) {
            return ResponseEntity.notFound().build();
        }

        RatingResponse response = new RatingResponse();
        response.setId(rate.getId());
        response.setJobId(rate.getJob().getId());
        response.setRaterId(rate.getRater().getId());
        response.setRateReceiverId(rate.getRateReceiver().getId());
        response.setRating(rate.getRating());
        response.setComment(rate.getComment());

        return ResponseEntity.ok(response);
    }

}
