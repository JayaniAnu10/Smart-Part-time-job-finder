package com.smartparttime.parttimebackend.modules.Rating;

import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingStats;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.lang.reflect.Array;
import java.util.UUID;

public interface RateRepository extends CrudRepository<Rate, UUID> {

    Rate findByRateReceiver_IdAndRater_IdAndJob_Id(UUID rateReceiverId, UUID raterId, UUID jobId);

    Page<Rate> findByJob_Id(UUID jobId, Pageable pageable);

    Page<Rate> findByRater_Id(UUID raterId, Pageable pageable);

    Page<Rate> findByRateReceiver_Id(UUID rateReceiverId, Pageable pageable);

    @Query("""
        select new com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingStats(
                count(r),
                avg(r.rating)
        ) from Rate r
          where r.rateReceiver.id=:userId""")
    RatingStats getRatingStatsByUserId(@Param("userId") UUID userId);

    Integer countByRateReceiver_Id(UUID rateReceiverId);
}