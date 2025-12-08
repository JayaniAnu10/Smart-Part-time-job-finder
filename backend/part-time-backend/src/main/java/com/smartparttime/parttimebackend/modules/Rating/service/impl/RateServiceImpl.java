package com.smartparttime.parttimebackend.modules.Rating.service.impl;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingRequest;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingResponse;
import com.smartparttime.parttimebackend.modules.Rating.RateMapper;
import com.smartparttime.parttimebackend.modules.Rating.RateRepository;
import com.smartparttime.parttimebackend.modules.Rating.service.RateService;
import com.smartparttime.parttimebackend.modules.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class RateServiceImpl implements RateService {
    private final JobRepo jobRepository;
    private final RateRepository rateRepository;
    private final RateMapper rateMapper;
    private final UserRepository userRepository;

    public RatingResponse addRate(RatingRequest request) {
        var rater = userRepository.findById(request.getRaterId()).orElse(null);
        var rateReceiver = userRepository.findById(request.getRateReceiverId()).orElse(null);

        if (rater == null || rateReceiver == null) {
            throw new NotFoundException("User not found");
        }

        if(request.getRateReceiverId().equals(request.getRaterId())){
            throw  new BadRequestException("Invalid rating request");
        }

        var job =jobRepository.findById(request.getJobId()).orElse(null);

        if(job==null){
            throw new NotFoundException("Job not found");
        }

        /*if(!job.getStatus().equalsIgnoreCase("COMPLETED")){
            throw  new BadRequestException("Job is not COMPLETED");
        }*/

        var rate= rateRepository.findByRateReceiver_IdAndRater_IdAndJob_Id(request.getRateReceiverId(),request.getRaterId(),job.getId());

        if(rate!=null){
            throw  new BadRequestException("You have already rated");
        }

        var newRate = rateMapper.toEntity(request);
        newRate.setJob(job);
        newRate.setRater(rater);
        newRate.setRateReceiver(rateReceiver);
        newRate.setCreatedDate(LocalDateTime.now());
        rateRepository.save(newRate);

        return  rateMapper.toDto(newRate);
    }
}
