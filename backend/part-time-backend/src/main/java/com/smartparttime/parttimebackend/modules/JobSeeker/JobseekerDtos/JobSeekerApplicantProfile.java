package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import lombok.Data;

import java.util.List;

@Data
public class JobSeekerApplicantProfile {
    private JobSeekerProfileDetails profileDetails;
    private List<JobSeekerCompletedJobDto> jobDetails;
}
