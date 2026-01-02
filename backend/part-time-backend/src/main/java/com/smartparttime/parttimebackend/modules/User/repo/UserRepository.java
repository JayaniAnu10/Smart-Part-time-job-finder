package com.smartparttime.parttimebackend.modules.User.repo;

import com.smartparttime.parttimebackend.modules.User.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;


public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsUserByEmail(String email);

    @Modifying
    @Query("""
        UPDATE User u
        SET u.totalRatings = :totalRatings,
            u.averageRate = :averageRating
        WHERE u.id = :userId
    """)
    void updateRatingStats(
            @Param("userId") UUID userId,
            @Param("totalRatings") Long totalRatings,
            @Param("averageRating") Double averageRating
    );

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}