package com.smartparttime.parttimebackend.modules.Recommendation.Services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class JobEmbeddingCache {

    private final Map<UUID, List<Float>> jobEmbeddingMap = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void loadEmbeddings(List<Job> jobs) {
        jobs.forEach(job -> {
            if (job.getEmbedding() != null) {
                try {
                    List<Float> embedding = objectMapper.readValue(
                            job.getEmbedding(),
                            new TypeReference<List<Float>>() {}
                    );
                    jobEmbeddingMap.put(job.getId(), embedding);
                } catch (Exception e) {

                }
            }
        });

    }

    public List<Float> get(UUID jobId) {
        return jobEmbeddingMap.get(jobId);
    }

    public void remove(UUID jobId) {
        jobEmbeddingMap.remove(jobId);
    }

    public void addOrUpdate(Job job) {
        if (job.getEmbedding() != null) {
            try {
                List<Float> embedding = objectMapper.readValue(
                        job.getEmbedding(),
                        new TypeReference<List<Float>>() {}
                );
                jobEmbeddingMap.put(job.getId(), embedding);
            } catch (Exception e) {
                log.warn("Failed to update embedding for job {}", job.getId());
            }
        }
    }
}
