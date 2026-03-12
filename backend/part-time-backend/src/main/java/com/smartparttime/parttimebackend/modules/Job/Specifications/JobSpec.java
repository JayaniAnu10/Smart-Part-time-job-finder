package com.smartparttime.parttimebackend.modules.Job.Specifications;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobSchedule;
import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;

import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;

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

    /**
     * Applies promotion-based ordering: jobs with active (non-expired) promotions appear first.
     * Uses a subquery to avoid duplicate rows from a JOIN on the promotions collection,
     * which would otherwise break pagination.
     * We check the result type so the count query (used by Spring Data for pagination) is unaffected.
     */
    public static Specification<Job> orderedByPromotion() {
        return (root, query, cb) -> {
            // Skip ordering for the count query Spring Data JPA runs for pagination
            if (Long.class.equals(query.getResultType()) || long.class.equals(query.getResultType())) {
                return cb.conjunction();
            }

            LocalDateTime now = LocalDateTime.now();

            // Subquery: count active promotions for each job
            Subquery<Long> activePromoCount = query.subquery(Long.class);
            Root<Promotion> promoRoot = activePromoCount.from(Promotion.class);
            activePromoCount.select(cb.count(promoRoot))
                    .where(
                            cb.equal(promoRoot.get("job"), root),
                            cb.greaterThan(promoRoot.<LocalDateTime>get("expiryDate"), now)
                    );

            // CASE WHEN active promotion exists THEN 1 ELSE 0 → order DESC (promoted first)
            Expression<Integer> hasActivePromotion = cb.<Integer>selectCase()
                    .when(cb.gt(activePromoCount, 0L), 1)
                    .otherwise(0);

            query.orderBy(cb.desc(hasActivePromotion));

            return cb.conjunction(); // Does not add a WHERE condition; only affects ORDER BY
        };
    }
}
