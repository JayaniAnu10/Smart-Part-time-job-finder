package com.smartparttime.parttimebackend.modules.Job.Specifications;

import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobSchedule;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class JobSpec {
    public static Specification<Job> hasTitle(String title) {
        return (root, query, cb) ->  cb.like( cb.lower(root.get("title")),
                "%" + title.toLowerCase() + "%");
    }

    public static Specification<Job> hasDescription(String description) {
        return (root, query, cb) ->  cb.like( cb.lower(root.get("description")),
                "%" + description.toLowerCase() + "%");
    }

    public static Specification<Job> hasMinSalaryGreaterThanOrEqualTo(BigDecimal minSalary) {
        return (root, query, cb) ->   cb.greaterThanOrEqualTo(root.get("minSalary"), minSalary );
    }

    public static Specification<Job> hasMaxSalaryLessThanOrEqualTo(BigDecimal maxSalary) {
        return (root, query, cb) ->  cb.lessThanOrEqualTo(root.get("maxSalary"), maxSalary);
    }

    public static Specification<Job> hasRequirements(String requirements) {
        return  (root, query, cb) ->   cb.like( cb.lower(root.get("requirements")),
                "%" + requirements.toLowerCase() + "%");
    }

    public static Specification<Job> hasCategory(String category) {
        return (root, query, cb) ->   cb.like( cb.lower(root.get("category")), category.toLowerCase() );
    }

    public static Specification<Job> hasDate(LocalDate date) {
        return (root, query, cb) -> {
            Join<Job, JobSchedule> scheduleJoin = root.join("jobSchedules");

            return cb.equal(
                    cb.function("DATE", LocalDate.class, scheduleJoin.get("startDatetime")),
                    date
            );
        };
    }

    public static Specification<Job> hasLocation(String location) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("location")),
                "%" + location.toLowerCase() + "%");
    }

    public static Specification<Job> hasJobType(String jobType) {
        return (root, query, cb) -> cb.equal(root.get("jobType"), jobType);
    }

    public static Specification<Job> hasRequiredGender(String requiredGender) {
        return (root, query, cb) -> cb.equal(root.get("requiredGender"), requiredGender);
    }
}
