package com.smartparttime.parttimebackend.modules.Application.dtos;

import lombok.Data;
import org.springframework.data.domain.Page;

@Data
public class JobApplicantsResponse {
    private String title;
    private Page<ApplicantsResponse> applicants;
}
