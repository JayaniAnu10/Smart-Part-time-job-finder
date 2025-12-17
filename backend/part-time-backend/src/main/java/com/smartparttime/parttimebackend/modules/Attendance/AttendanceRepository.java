package com.smartparttime.parttimebackend.modules.Attendance;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findById(UUID id);
}