package com.smartparttime.parttimebackend.modules.Admin.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminAnalyticsRepo {

    // Total users
    @Query("SELECT COUNT(u) FROM User u")
    long getTotalUsers();

    // Total employers
    @Query("SELECT COUNT(e) FROM Employer e")
    long getTotalEmployers();

    // Total job seekers
    @Query("SELECT COUNT(js) FROM JobSeeker js")
    long getTotalJobSeekers();

    // Total jobs posted
    @Query("SELECT COUNT(j) FROM Job j")
    long getTotalJobs();

    // Active jobs
    @Query("SELECT COUNT(j) FROM Job j WHERE j.status = 'ACTIVE'")
    long getActiveJobs();

    // Payments total income (system earnings)
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p")
    double getTotalPaymentAmount();

    // Total complaints
    @Query("SELECT COUNT(c) FROM Complaint c")
    long getTotalComplaints();

    // Pending complaints
    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.status = 'PENDING'")
    long getPendingComplaints();
}
