package com.smartparttime.parttimebackend.modules.Job.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class JobCategoryDto implements Serializable {
    private Long id;
    private String category;

}
