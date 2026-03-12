package com.smartparttime.parttimebackend.modules.Job.repo;

import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobRepositoryCustomImpl implements JobRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Job> findAllWithPromotionOrder(Specification<Job> spec, Pageable pageable) {

        // --- Main query ---
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Job> query = cb.createQuery(Job.class);
        Root<Job> root = query.from(Job.class);

        // Apply WHERE predicates from spec
        Predicate predicate = spec.toPredicate(root, query, cb);
        if (predicate != null) {
            query.where(predicate);
        }

        // Promotion join for ordering
        Join<Object, Object> promoJoin = root.join("promotions", JoinType.LEFT);
        Join<Object, Object> categoryJoin = promoJoin.join("promotionCategory", JoinType.LEFT);

        query.distinct(true);

        query.orderBy(
            cb.asc(
                cb.selectCase()
                    .when(cb.equal(categoryJoin.get("name"), "Premium"), 1)
                    .when(cb.equal(categoryJoin.get("name"), "Standard"), 2)
                    .when(cb.equal(categoryJoin.get("name"), "Basic"), 3)
                    .otherwise(4)
            ),
            cb.desc(root.get("postedDate"))
        );

        List<Job> results = em.createQuery(query)
            .setFirstResult((int) pageable.getOffset())
            .setMaxResults(pageable.getPageSize())
            .getResultList();

        // --- Count query (no join, no order) ---
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<Job> countRoot = countQuery.from(Job.class);

        Predicate countPredicate = spec.toPredicate(countRoot, countQuery, cb);
        if (countPredicate != null) {
            countQuery.where(countPredicate);
        }

        countQuery.select(cb.countDistinct(countRoot));
        Long total = em.createQuery(countQuery).getSingleResult();

        return new PageImpl<>(results, pageable, total);
    }
}
