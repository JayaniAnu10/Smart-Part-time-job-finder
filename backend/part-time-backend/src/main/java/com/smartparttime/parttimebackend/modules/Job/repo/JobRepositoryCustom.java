package com.smartparttime.parttimebackend.modules.Job.repo;

import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface JobRepositoryCustom {
    Page<Job> findAllWithPromotionOrder(Specification<Job> spec, Pageable pageable);
}
