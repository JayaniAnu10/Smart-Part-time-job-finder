package com.smartparttime.parttimebackend.modules.Recommendation;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeeker;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeekerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Service
public class RecommendationService {
    private final JobSeekerRepository jobSeekerRepository;
    private final JobRepo jobRepo;
    private final JobEmbeddingCache jobEmbeddingCache;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<Job> recommendJobs(UUID seekerId, int topN) throws Exception {
        JobSeeker seeker = jobSeekerRepository.findById(seekerId)
                .orElseThrow(() -> new Exception("Job seeker not found"));

        if (seeker.getEmbedding() == null) return List.of();

        List<Float> seekerEmbedding = objectMapper.readValue(
                seeker.getEmbedding(), new TypeReference<List<Float>>() {}
        );

        List<Job> candidates = jobRepo.findAllByStatusAndRequiredGenderContainingIgnoreCase(JobStatus.ACTIVE, seeker.getGender());

        return candidates.stream()
                .map(job -> {
                    List<Float> jobVec = jobEmbeddingCache.get(job.getId());
                    double score = 0.0;
                    if (jobVec != null) {
                        score = cosineSimilarity(seekerEmbedding, jobVec);
                    }
                    return new JobWithScore(job, score);
                })
                .sorted(Comparator.comparingDouble(JobWithScore::score).reversed())
                .limit(topN)
                .map(JobWithScore::job)
                .toList();
    }

    private record JobWithScore(Job job, double score) {}

    private double cosineSimilarity(List<Float> vec1, List<Float> vec2) {
        double dot = 0.0, normA = 0.0, normB = 0.0;
        for (int i = 0; i < vec1.size(); i++) {
            dot += vec1.get(i) * vec2.get(i);
            normA += vec1.get(i) * vec1.get(i);
            normB += vec2.get(i) * vec2.get(i);
        }
        return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
    }
}
