package com.smartparttime.parttimebackend.modules.Job.service.impl;

import com.smartparttime.parttimebackend.modules.Employer.EmployerRepository;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Job.dto.JobRequestDto;
import com.smartparttime.parttimebackend.modules.Job.dto.JobResponseDto;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobCategory;
import com.smartparttime.parttimebackend.modules.Job.repo.JobCategoryRepo;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.Job.service.JobService;
import com.smartparttime.parttimebackend.modules.User.User;
import com.smartparttime.parttimebackend.modules.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepo jobRepo;


    @Autowired
    private JobCategoryRepo categoryRepo;

    @Autowired
    private EmployerRepository employerRepository;


    @Override
    public JobResponseDto createJob(JobRequestDto request, UUID employerId) {

        Job job = mapToJob(request, employerId);
        Job savedJob = jobRepo.save(job);

        return mapToResponse(savedJob);
    }


    @Override
    public List<JobResponseDto> getAllJobs() {
        return jobRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    @Override
    public JobResponseDto getJobById(UUID jobId) {
        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return mapToResponse(job);
    }


    @Override
    public List<JobResponseDto> getJobsByEmployer(UUID employerId) {
        return jobRepo.findByEmployee_Id(employerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    @Override
    public Page<JobResponseDto> searchJobs(Integer categoryId,
                                           String location,
                                           String jobType,
                                           String title,
                                           String keyword,
                                           String skill,
                                           int page,
                                           int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Job> jobsPage;

        if (categoryId != null) {
            jobsPage = jobRepo.findByCategory_Id(categoryId, pageable);
        }
        else if (location != null && !location.isBlank()) {
            jobsPage = jobRepo.findByLocationContainingIgnoreCase(location, pageable);
        }
        else if (jobType != null && !jobType.isBlank()) {
            jobsPage = jobRepo.findByJobType(jobType, pageable);
        }
        else if (title != null && !title.isBlank()) {
            jobsPage = jobRepo.findByTitleContainingIgnoreCase(title, pageable);
        }
        else if (keyword != null && !keyword.isBlank()) {
            jobsPage = jobRepo.findByDescriptionContainingIgnoreCase(keyword, pageable);
        }
        else if (skill != null && !skill.isBlank()) {
            jobsPage = jobRepo.findBySkillsContainingIgnoreCase(skill, pageable);
        }
        else {
            jobsPage = jobRepo.findAll(pageable);
        }

        return jobsPage.map(this::mapToResponse);
    }


    @Override
    public JobResponseDto updateJob(UUID jobId, JobRequestDto dto) {
        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (dto.getTitle() != null) job.setTitle(dto.getTitle());
        if (dto.getDescription() != null) job.setDescription(dto.getDescription());
        if (dto.getLocation() != null) job.setLocation(dto.getLocation());
        if (dto.getJobType() != null) job.setJobType(dto.getJobType());
        if (dto.getDeadline() != null) job.setDeadline(dto.getDeadline());
        if (dto.getSalary() != null) job.setSalary(dto.getSalary());
        if (dto.getWorkingHours() != null) job.setWorkingHours(dto.getWorkingHours());
        if (dto.getSkills() != null) job.setSkills(dto.getSkills());

        if (dto.getCategoryId() != null) {
            JobCategory category = categoryRepo.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            job.setCategory(category);
        }

        Job updated = jobRepo.save(job);

        return mapToResponse(updated);
    }


    @Override
    public void deleteJob(UUID jobId) {
        jobRepo.deleteById(jobId);
    }


    private Job mapToJob(JobRequestDto dto, UUID employerId) {

        var user = employerRepository.findById(employerId).orElseThrow();
        Job job = new Job();

        job.setTitle(dto.getTitle());
        job.setDescription(dto.getDescription());
        job.setLocation(dto.getLocation());
        job.setJobType(dto.getJobType());
        job.setDeadline(dto.getDeadline());
        job.setEmployee(user);
        job.setSalary(dto.getSalary());
        job.setWorkingHours(dto.getWorkingHours());
        job.setSkills(dto.getSkills());
        job.setAvailableVacancies(dto.getAvailableVacancies());
        job.setTotalVacancies(dto.getTotalVacancies());


        JobCategory category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        job.setCategory(category);

        job.setPostedDate(LocalDate.now());
        job.setStatus(JobStatus.ACTIVE);

        return job;
    }


    private JobResponseDto mapToResponse(Job job) {

        JobResponseDto dto = new JobResponseDto();

        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setLocation(job.getLocation());
        dto.setJobType(job.getJobType());
        dto.setDeadline(job.getDeadline());
        dto.setPostedDate(job.getPostedDate());
        dto.setStatus(job.getStatus());
        dto.setSalary(job.getSalary());
        dto.setWorkingHours(job.getWorkingHours());
        dto.setSkills(job.getSkills());
        dto.setAvailableVacancies(job.getAvailableVacancies());
        dto.setTotalVacancies(job.getTotalVacancies());

        if (job.getEmployee() != null) {
            dto.setEmployerId(job.getEmployee().getId());
        }

        if (job.getCategory() != null) {
            dto.setCategoryId(job.getCategory().getId());
            dto.setCategoryName(job.getCategory().getCategory());
        }

        return dto;
    }
}
