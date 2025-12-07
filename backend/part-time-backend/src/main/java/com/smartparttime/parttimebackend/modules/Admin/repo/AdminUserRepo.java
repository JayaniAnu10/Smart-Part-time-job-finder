package com.smartparttime.parttimebackend.modules.Admin.repo;

import com.smartparttime.parttimebackend.modules.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AdminUserRepo extends JpaRepository<User, UUID> {

    @Query("SELECT u FROM User u ORDER BY u.createdAt DESC")
    List<User> findAllUsers();

    @Query("""
           SELECT u FROM User u
           LEFT JOIN u.jobSeeker js
           LEFT JOIN u.employer e
           WHERE LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
              OR LOWER(u.contact) LIKE LOWER(CONCAT('%', :keyword, '%'))
              OR (js IS NOT NULL AND LOWER(js.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')))
              OR (js IS NOT NULL AND LOWER(js.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')))
              OR (e IS NOT NULL AND LOWER(e.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')))
           """)
    List<User> searchUsers(String keyword);
}
