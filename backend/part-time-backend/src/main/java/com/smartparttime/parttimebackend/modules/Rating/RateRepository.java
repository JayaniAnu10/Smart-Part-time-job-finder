package com.smartparttime.parttimebackend.modules.Rating;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface RateRepository extends CrudRepository<Rate, UUID> {

    Rate findByRateReceiver_IdAndRater_IdAndJob_Id(UUID rateReceiverId, UUID raterId, UUID jobId);
}