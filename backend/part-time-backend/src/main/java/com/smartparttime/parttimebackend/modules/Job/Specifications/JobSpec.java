package com.smartparttime.parttimebackend.modules.Job.Specifications;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.smartparttime.parttimebackend.modules.Job.PromoStatus;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobSchedule;
import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;
import com.smartparttime.parttimebackend.modules.Job.entity.PromotionCategory;

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
         * Applies promotion-tier ordering:
         * Premium -> Standard -> Basic -> normal (non-promoted) jobs.
         * Uses subqueries to avoid duplicates that would break pagination.
         */
    public static Specification<Job> orderedByPromotion() {
        return (root, query, cb) -> {
            if (Long.class.equals(query.getResultType()) || long.class.equals(query.getResultType())) {
                return cb.conjunction();
            }

            LocalDateTime now = LocalDateTime.now();

            // Subquery: get the best (lowest) rank among active promotions of this job.
            // premium=1, standard=2, basic=3, any other plan=4
            Subquery<Integer> promoRankSubquery = query.subquery(Integer.class);
            Root<Promotion> promoRoot = promoRankSubquery.from(Promotion.class);
            Join<Promotion, PromotionCategory> categoryJoin = promoRoot.join("category");

            Expression<Integer> promoRank = cb.<Integer>selectCase()
                .when(cb.equal(cb.lower(categoryJoin.get("name")), "premium"), 1)
                .when(cb.equal(cb.lower(categoryJoin.get("name")), "standard"), 2)
                .when(cb.equal(cb.lower(categoryJoin.get("name")), "basic"), 3)
                .otherwise(4);

            promoRankSubquery.select(cb.min(promoRank))
                    .where(
                            cb.equal(promoRoot.get("job"), root),
                    cb.equal(promoRoot.get("status"), PromoStatus.ACTIVE),
                    cb.greaterThan(promoRoot.<LocalDateTime>get("expiryDate"), now)
                    );

            // If no active promotion exists, put job after all known promo tiers.
            Expression<Integer> effectiveRank = cb.coalesce(promoRankSubquery.getSelection(), 5);

            query.orderBy(
                cb.asc(effectiveRank),
                cb.desc(root.get("postedDate"))
            );

            return cb.conjunction();
        };
    }
}
