package com.smartparttime.parttimebackend.modules.Rating;

import org.springframework.data.repository.CrudRepository;

public interface RateRepository extends CrudRepository<Rate, Long> {
    Object findByRateReceiver_IdAndRater_IdAndJob_Id(Long rateReceiverId, Long raterId, Long jobId);
}