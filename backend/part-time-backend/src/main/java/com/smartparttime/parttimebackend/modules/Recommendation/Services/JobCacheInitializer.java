package com.smartparttime.parttimebackend.modules.Recommendation.Services;

import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JobCacheInitializer implements CommandLineRunner {

    private final JobRepo jobRepo;
    private final JobEmbeddingCache jobEmbeddingCache;

    public JobCacheInitializer(JobRepo jobRepo, JobEmbeddingCache jobEmbeddingCache) {
        this.jobRepo = jobRepo;
        this.jobEmbeddingCache = jobEmbeddingCache;
    }

    @Override
    public void run(String... args) {
        List<Job> allJobs = jobRepo.findAllByStatus(JobStatus.ACTIVE);

        jobEmbeddingCache.loadEmbeddings(allJobs);

        System.out.println(" Loaded " + allJobs.size() + " job embeddings into memory cache.");
    }
}
