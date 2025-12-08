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

    public static Specification<Job> hasSalaryGreaterThanOrEqualTo(BigDecimal salary) {
        return (root, query, cb) ->   cb.greaterThanOrEqualTo(root.get("salary"), salary );
    }

    public static Specification<Job> hasSalaryLessThanOrEqualTo(BigDecimal salary) {
        return (root, query, cb) ->  cb.lessThanOrEqualTo(root.get("salary"), salary);
    }

    public static Specification<Job> hasSkills(String skills) {
        return  (root, query, cb) ->   cb.like( cb.lower(root.get("skills")),
                "%" + skills.toLowerCase() + "%");
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
        return (root, query, cb) -> cb.equal(root.get("location"), location);
    }

    public static Specification<Job> hasJobType(String jobType) {
        return (root, query, cb) -> cb.equal(root.get("jobType"), jobType);
    }
}
