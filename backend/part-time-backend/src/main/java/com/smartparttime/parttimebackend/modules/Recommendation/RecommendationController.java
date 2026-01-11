package com.smartparttime.parttimebackend.modules.Recommendation;

import com.smartparttime.parttimebackend.modules.Job.dto.JobResponseDto;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.mappers.JobMapper;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeekerService;
import com.smartparttime.parttimebackend.modules.Recommendation.Dto.ResponseDto;
import com.smartparttime.parttimebackend.modules.Recommendation.Services.RecommendationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/recommendations")
@AllArgsConstructor
public class RecommendationController {
    private final RecommendationService recommendationService;
    private final JobMapper jobMapper;
    private final JobSeekerService jobSeekerService;

    @GetMapping("/seeker/{seekerId}")
    public ResponseEntity<List<ResponseDto>> getRecommendedJobs(
            @PathVariable UUID seekerId,
            @RequestParam(defaultValue = "6") int top
    ) throws Exception {
        List<Job> jobs = recommendationService.recommendJobs(seekerId, top);
        List<ResponseDto> response = jobs.stream().map(jobMapper::toRecommended).toList();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{seekerId}/generate-embedding")
    public ResponseEntity<String> generateEmbedding(@PathVariable UUID seekerId) {
        try {
            jobSeekerService.generateSeekerEmbedding(seekerId);
            return ResponseEntity.ok("Embedding generated and saved for seeker " + seekerId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to generate embedding: " + e.getMessage());
        }
    }
}

