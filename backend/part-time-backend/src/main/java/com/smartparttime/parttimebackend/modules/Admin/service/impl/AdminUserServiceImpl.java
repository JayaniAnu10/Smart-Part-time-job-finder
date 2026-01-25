package com.smartparttime.parttimebackend.modules.Admin.service.impl;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminUserDto;
import com.smartparttime.parttimebackend.modules.Admin.mapper.AdminUserMapper;
import com.smartparttime.parttimebackend.modules.Admin.repo.AdminUserRepo;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminUserService;
import com.smartparttime.parttimebackend.modules.Application.repo.JobApplicationRepository;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceRepository;
import com.smartparttime.parttimebackend.modules.Employer.EmployerRepository;
import com.smartparttime.parttimebackend.modules.Job.service.JobService;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeekerRepository;
import com.smartparttime.parttimebackend.modules.Notification.repo.NotificationRepo;
import com.smartparttime.parttimebackend.modules.Payment.PaymentRepository;
import com.smartparttime.parttimebackend.modules.Rating.RateRepository;
import com.smartparttime.parttimebackend.modules.User.Role;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import com.smartparttime.parttimebackend.modules.User.repo.ComplaintRepository;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;



@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private AdminUserRepo adminUserRepo;

    @Autowired
    private AdminUserMapper adminUserMapper;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private NotificationRepo notificationRepository;

    @Autowired
    private PaymentRepository   paymentRepository;

    @Autowired
    private RateRepository rateRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private JobSeekerRepository jobSeekerRepository;






    @Override
    public List<AdminUserDto> getAllUsers() {

            return adminUserRepo.findAllUsers()
                    .stream()
                    .map(adminUserMapper::mapToDto)
                    .collect(Collectors.toList());

    }

    @Override
    public AdminUserDto getUserById(UUID userId) {

        User user = adminUserRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return adminUserMapper.mapToDto(user);

    }

    @Override
    public AdminUserDto updateUserStatus(UUID userId, boolean isActive) {

        User user =  adminUserRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsVerified(isActive);
        adminUserRepo.save(user);
        return adminUserMapper.mapToDto(user);




    }

    @Override
    public List<AdminUserDto> searchUsers(String keyword) {

       return adminUserRepo.searchUsers(keyword)
               .stream()
               .map(adminUserMapper::mapToDto)
               .collect(Collectors.toList());
    }



    @Transactional
    @Override
    public void deleteUser(UUID userId) {

        User user = adminUserRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));


        if (user.getRole() == Role.ADMIN) {
            throw new RuntimeException("Admin user cannot be deleted");
        }




        attendanceRepository.deleteAll(user.getAttendances());


        jobApplicationRepository.deleteAll(user.getJobApplications());


        complaintRepository.deleteAll(user.getReporter());
        complaintRepository.deleteAll(user.getTarget());


        notificationRepository.deleteAll(user.getNotifications());


        paymentRepository.deleteAll(user.getPayer());
        paymentRepository.deleteAll(user.getReceiver());


        rateRepository.deleteAll(user.getRater());
        rateRepository.deleteAll(user.getRateReceiver());

        if (user.getEmployer() != null) {
            employerRepository.delete(user.getEmployer());
        }


        if (user.getJobSeeker() != null) {
            jobSeekerRepository.delete(user.getJobSeeker());
        }


        adminUserRepo.delete(user);
    }


    public String getUserEmailById(UUID userId) {
        return adminUserRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getEmail();
    }








}
