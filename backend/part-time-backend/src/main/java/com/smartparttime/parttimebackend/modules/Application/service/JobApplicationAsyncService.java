package com.smartparttime.parttimebackend.modules.Application.service;

import com.smartparttime.parttimebackend.common.Services.EmailService;
import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Attendance.Attendance;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceRepository;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceService;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceStatus;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class JobApplicationAsyncService {

    private final JobRepo jobRepo;
    private final AttendanceRepository attendanceRepository;
    private final AttendanceService attendanceService;
    private final EmailService emailService;

    @Async("taskExecutor")
    public void approveApplication(JobApplication application){
        try{
            var job= application.getJob();


            job.setAvailableVacancies(job.getAvailableVacancies()-1);
            jobRepo.save(job);

            String qrToken= UUID.randomUUID() + "-" + System.currentTimeMillis();

            Attendance attendance = new Attendance();
            attendance.setJob(job);
            attendance.setUser(application.getJobseeker());
            attendance.setSchedule(application.getSchedule());
            attendance.setQrCode(qrToken);
            attendance.setStatus(AttendanceStatus.PENDING);

            attendanceRepository.save(attendance);

            byte[] qrCode =attendanceService.generateQr(qrToken);


            String email = application.getJobseeker().getEmail();
            String jobTitle = job.getTitle();
            LocalDateTime scheduleStartDate = application.getSchedule().getStartDatetime();
            LocalDateTime scheduleEndDate = application.getSchedule().getEndDatetime();

            emailService.sendQrCodeEmail(email,  jobTitle, scheduleStartDate,scheduleEndDate, qrCode);


        }catch(Exception e){
            throw new RuntimeException("Failed  to process application approval", e);
        }


    }
}
