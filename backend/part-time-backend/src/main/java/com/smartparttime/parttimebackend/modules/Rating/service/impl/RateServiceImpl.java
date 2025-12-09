package com.smartparttime.parttimebackend.modules.Rating.service.impl;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingRequest;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingResponse;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingStats;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingUpdateRequest;
import com.smartparttime.parttimebackend.modules.Rating.RateMapper;
import com.smartparttime.parttimebackend.modules.Rating.RateRepository;
import com.smartparttime.parttimebackend.modules.Rating.service.RateService;
import com.smartparttime.parttimebackend.modules.User.Role;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class RateServiceImpl implements RateService {
    private final JobRepo jobRepository;
    private final RateRepository rateRepository;
    private final RateMapper rateMapper;
    private final UserRepository userRepository;


    @Transactional
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

        validateRatingPermission(rater,rateReceiver,job);

        var newRate = rateMapper.toEntity(request);
        newRate.setJob(job);
        newRate.setRater(rater);
        newRate.setRateReceiver(rateReceiver);
        newRate.setCreatedDate(LocalDateTime.now());
        rateRepository.save(newRate);

        updateUserRatingStats(rateReceiver.getId());

        return  rateMapper.toDto(newRate);
    }

    private void validateRatingPermission(User rater, User rateReceiver, Job job) {
        /*boolean raterIsEmployer = rater.getRole() == Role.EMPLOYER &&
                job.getEmployer().getId().equals(rater.getId());
        boolean raterIsJobSeeker = rater.getRole() == Role.JOBSEEKER;

        if (!raterIsEmployer && !raterIsJobSeeker) {
            throw new BadRequestException("You are not authorized to rate this job");
        }


        if (rater.getRole() == Role.EMPLOYER) {
            if (rateReceiver.getRole() != Role.JOBSEEKER) {
                throw new BadRequestException("Employers can only rate job seekers");
            }

        }else if(rater.getRole() == Role.JOBSEEKER) {
            if (rateReceiver.getRole() != Role.EMPLOYER) {
                throw new BadRequestException("Job seekers can only rate employers");
            }

            if (!job.getEmployer().getId().equals(rateReceiver.getId())) {
                throw new BadRequestException("You can only rate the employer who posted this job");
            }
        } else {
            throw new BadRequestException("Invalid user role for rating");
        }*/

    }

    private void updateUserRatingStats(UUID userId) {
        RatingStats stats = rateRepository.getRatingStatsByUserId(userId);
        userRepository.updateRatingStats(userId,stats.getTotalRating(),stats.getAverageRating());

    }

    @Override
    public RatingResponse getRateById(UUID id) {
        var rate = rateRepository.findById(id).orElse(null);
        if(rate==null){
            throw new NotFoundException("Rate not found");
        }
        return  rateMapper.toDto(rate);
    }

    @Override
    public Page<RatingResponse> getRatesByJob(UUID id, int page, int size) {
        var job =jobRepository.findById(id).orElse(null);
        if(job==null){
            throw new NotFoundException("Job not found");
        }

        Pageable pageable = PageRequest.of(page, size);

        var rates = rateRepository.findByJob_Id(id,pageable);
        if(rates.isEmpty()){
            throw new NotFoundException("Rates not found");
        }

        return rates.map(rateMapper::toDto);

    }

    @Override
    public Page<RatingResponse> getRatesByRater(UUID id, int page, int size) {
        var user =userRepository.findById(id).orElse(null);
        if(user==null){
            throw new NotFoundException("User not found");
        }
        Pageable pageable = PageRequest.of(page, size);

        var rates = rateRepository.findByRater_Id(id,pageable);

        return  rates.map(rateMapper::toDto);
    }

    @Override
    public Page<RatingResponse> getRatesByUser(UUID id, int page, int size) {
        var user =userRepository.findById(id).orElse(null);
        if(user==null){
            throw new NotFoundException("User not found");
        }
        Pageable pageable = PageRequest.of(page, size);

        var rates = rateRepository.findByRateReceiver_Id(id,pageable);

        return  rates.map(rateMapper::toDto);
    }

    @Override
    public RatingResponse updateRate(RatingUpdateRequest request) {
        var rate = rateRepository.findById(request.getId()).orElse(null);
        if(rate==null){
            throw new NotFoundException("Rate not found");
        }

        if(!request.getRateReceiverId().equals(rate.getRateReceiver().getId())){
            throw  new BadRequestException("Invalid rate request");
        }

        if(!request.getRaterId().equals(rate.getRater().getId())){
            throw  new BadRequestException("Invalid rate request");
        }

        rate.setRating(request.getRating());
        rate.setComment(request.getComment());
        rate.setCreatedDate(LocalDateTime.now());
        rateRepository.save(rate);

        return  rateMapper.toDto(rate);
    }

    @Override
    public ResponseEntity<Void> deleteRateById(UUID userId ,UUID id) {
        var rate = rateRepository.findById(id).orElse(null);
        if(rate==null){
            throw new NotFoundException("Rate not found");
        }

        if(!rate.getRater().getId().equals(userId)){
            throw  new BadRequestException("Invalid rate request");
        }

        rateRepository.delete(rate);
        return ResponseEntity.ok().build();
    }

    @Override
    public BigDecimal getAverageRateOfUser(UUID id) {
        var user =userRepository.findById(id).orElse(null);
        if(user==null){
            throw new NotFoundException("User not found");
        }

        return user.getAverageRate();
    }
}
