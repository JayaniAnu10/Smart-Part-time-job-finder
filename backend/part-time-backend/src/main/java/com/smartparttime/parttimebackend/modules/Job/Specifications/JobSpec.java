package com.smartparttime.parttimebackend.modules.Job.Specifications;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobSchedule;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class JobSpec {
    public static Specification<Job> hasTitleRequirementsDescription(String keyword) {
        return (root, query, cb) -> {
            String pattern = "%" + keyword.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("title")), pattern),
                    cb.like(cb.lower(root.get("requirements")), pattern),
                    cb.like(cb.lower(root.get("description")), pattern)
            );
        };
    }

    public static Specification<Job> orderByPromotion() {
        return (root, query, cb) -> {

            if (query.getResultType() != Long.class) {   // avoid affecting count query

                Join<Object, Object> promoJoin = root.join("promotions", JoinType.LEFT);
                Join<Object, Object> categoryJoin = promoJoin.join("category", JoinType.LEFT);

                query.distinct(true);

                query.orderBy(
                        cb.asc(
                                cb.selectCase()
                                        .when(cb.equal(categoryJoin.get("name"), "Premium"), 1)
                                        .when(cb.equal(categoryJoin.get("name"), "Standard"), 2)
                                        .when(cb.equal(categoryJoin.get("name"), "Basic"), 3)
                                        .otherwise(4)
                        ),
                        cb.desc(root.get("postedDate")) // secondary sorting
                );
            }

            return null;
        };
    }

    public static Specification<Job> hasMinSalaryGreaterThanOrEqualTo(BigDecimal minSalary) {
        return (root, query, cb) ->   cb.greaterThanOrEqualTo(root.get("minSalary"), minSalary );
    }

    public static Specification<Job> hasMaxSalaryLessThanOrEqualTo(BigDecimal maxSalary) {
        return (root, query, cb) ->  cb.lessThanOrEqualTo(root.get("maxSalary"), maxSalary);
    }

    public static Specification<Job> hasCategory(String category) {
        return (root, query, cb) -> {
            Join<Object, Object> join = root.join("category");
            return cb.equal(cb.lower(join.get("category")), category.toLowerCase());
        };
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
        return (root, query, cb) -> cb.equal(cb.lower(root.get("jobType")), jobType.toLowerCase());
    }

    public static Specification<Job> hasRequiredGender(String requiredGender) {
        return (root, query, cb) -> cb.equal(root.get("requiredGender"), requiredGender);
    }

    public static Specification<Job> notExpired() {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("deadline"), LocalDateTime.now());
    }
}
