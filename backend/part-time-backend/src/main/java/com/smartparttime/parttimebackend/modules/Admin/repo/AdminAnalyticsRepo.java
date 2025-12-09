package com.smartparttime.parttimebackend.modules.Admin.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminAnalyticsRepo {



    @Query("SELECT COUNT(u) FROM User u")
    long getTotalUsers();

    @Query("SELECT COUNT(e) FROM Employer e")
    long getTotalEmployers();

    @Query("SELECT COUNT(js) FROM JobSeeker js")
    long getTotalJobSeekers();




    @Query("SELECT COUNT(j) FROM Job j")
    long getTotalJobs();

    @Query("SELECT COUNT(j) FROM Job j WHERE j.status = 'ACTIVE'")
    long getActiveJobs();




    @Query("SELECT COUNT(a) FROM JobApplication a")
    long getTotalApplications();




    @Query("SELECT COUNT(p) FROM Payment p")
    long getTotalPayments();

    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p")
    double getTotalPaymentAmount();




    @Query("SELECT COUNT(c) FROM Complaint c")
    long getTotalComplaints();

    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.status = 'PENDING'")
    long getPendingComplaints();




    @Query("""
           SELECT c.category, COUNT(j)
           FROM Job j
           JOIN j.category c
           GROUP BY c.category
           """)
    List<Object[]> getTopCategories();




    @Query("""
           SELECT j.postedDate, COUNT(j)
           FROM Job j
           GROUP BY j.postedDate
           ORDER BY j.postedDate ASC
           """)
    List<Object[]> getDailyTraffic();
}
