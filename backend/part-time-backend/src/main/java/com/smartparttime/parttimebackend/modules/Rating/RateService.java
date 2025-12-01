package com.smartparttime.parttimebackend.modules.Rating;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.Job.JobRepository;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class RateService {
    private final JobRepository jobRepository;
    private final RateRepository rateRepository;
    private final RateMapper rateMapper;

    public ResponseEntity<Void> addRate(RatingRequest request) {
        if(request.getRateReceiverId()==request.getRaterId()){
            throw  new BadRequestException("Invalid rating request");
        }

        var job =jobRepository.findById(request.getJobId()).orElse(null);

        if(job==null){
            throw new NotFoundException("Job not found");
        }

        if(!job.getStatus().equalsIgnoreCase("COMPLETED")){
            throw  new BadRequestException("Job is not COMPLETED");
        }

        var rate= rateRepository.findByRateReceiver_IdAndRater_IdAndJob_Id(request.getRateReceiverId(), request.getRaterId(),job.getId());

        if(rate!=null){
            throw  new BadRequestException("You have already rated");
        }

        var newRate = rateMapper.toEntity(request);
        newRate.setCreatedDate(LocalDateTime.now());
        rateRepository.save(newRate);

        return  ResponseEntity.ok().build();
    }
}
