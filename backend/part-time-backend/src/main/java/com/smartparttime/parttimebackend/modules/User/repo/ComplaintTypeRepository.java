package com.smartparttime.parttimebackend.modules.User.repo;

import com.smartparttime.parttimebackend.modules.User.entities.ComplaintType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintTypeRepository extends JpaRepository<ComplaintType, Integer> {
}