package com.smartparttime.parttimebackend.modules.Rating;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RateService {
   /* private final JobRepository jobRepository;
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
        newRate.setJob(job);
        newRate.setCreatedDate(LocalDateTime.now());
        rateRepository.save(newRate);

        return  ResponseEntity.ok().build();
    }*/
}
