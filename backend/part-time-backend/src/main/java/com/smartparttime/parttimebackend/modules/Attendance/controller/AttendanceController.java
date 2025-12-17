package com.smartparttime.parttimebackend.modules.Attendance.controller;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceRepository;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceStatus;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@RestController
@RequestMapping("/attendance")
public class AttendanceController {
    private final AttendanceRepository attendanceRepository;


    @GetMapping("/scan")
    public ResponseEntity<String> scanQr(@RequestParam String token){
        var attendance = attendanceRepository.findByQrCode(token);

        if(attendance.getSchedule().getEndDatetime().isBefore(LocalDateTime.now().plusDays(1))){
            throw new BadRequestException("QR expired");
        }

        if(attendance.getSchedule().getStartDatetime().isAfter(LocalDateTime.now())){
            throw new BadRequestException("Attendance is too early");
        }

        if(attendance.getStatus() == AttendanceStatus.PENDING){
            attendance.setCheckInTime(LocalDateTime.now());
            attendance.setStatus(AttendanceStatus.CHECKED_IN);
            return ResponseEntity.ok("Check in successfully");
        }

        if (attendance.getStatus() == AttendanceStatus.CHECKED_IN) {
            attendance.setCheckOutTime(LocalDateTime.now());
            attendance.setStatus(AttendanceStatus.CHECKED_OUT);
            return ResponseEntity.ok("Check-out successful");
        }

        return ResponseEntity.badRequest().body("Attendance already completed");
    }
}
