package com.smartparttime.parttimebackend.modules.Job.repo;

import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobSchedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface JobRepo extends JpaRepository<Job, UUID> , JpaSpecificationExecutor<Job> {

    Page<Job> findByEmployer_Id(UUID employerId, Pageable pageable);

    Page<Job> findByLocationContainingIgnoreCase(String location, Pageable pageable);

    //6371 is the earth radius in km
    @Query(value = """
        SELECT *, (
            6371 * acos( 
                cos(radians(:userLat)) *
                cos(radians(latitude)) *
                cos(radians(longitude) - radians(:userLng)) +
                sin(radians(:userLat)) *
                sin(radians(latitude))
            )
        ) AS distance
        FROM job
        HAVING distance <= :radius
        ORDER BY distance
        """, nativeQuery = true)
    List<Job> findNearbyJobs(@Param("userLat") double userLat,
                             @Param("userLng") double userLng,
                             @Param("radius") double radius);


}
