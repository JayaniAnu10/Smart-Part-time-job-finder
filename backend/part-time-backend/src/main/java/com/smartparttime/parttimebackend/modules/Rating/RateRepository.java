package com.smartparttime.parttimebackend.modules.Rating;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface RateRepository extends CrudRepository<Rate, UUID> {

    Rate findByRateReceiver_IdAndRater_IdAndJob_Id(UUID rateReceiverId, UUID raterId, UUID jobId);

    Page<Rate> findByJob_Id(UUID jobId, Pageable pageable);

    Page<Rate> findByRater_Id(UUID raterId, Pageable pageable);

    Page<Rate> findByRateReceiver_Id(UUID rateReceiverId, Pageable pageable);
}