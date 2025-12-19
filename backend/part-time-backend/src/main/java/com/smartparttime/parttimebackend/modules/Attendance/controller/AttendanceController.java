package com.smartparttime.parttimebackend.modules.Attendance.controller;

import com.google.zxing.WriterException;
import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.modules.Application.repo.JobApplicationRepository;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceRepository;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceService;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceStatus;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/attendance")
public class AttendanceController {
    private final AttendanceRepository attendanceRepository;
    private final AttendanceService attendanceService;
    private final JobApplicationRepository jobApplicationRepository;

    @PostMapping("/{id}")
    public byte[] generateQr(@PathVariable UUID id) throws IOException, WriterException {
        var attendance = attendanceRepository.findById(id).orElse(null);
        if(attendance==null){
            throw new BadRequestException("Attendance not found");
        }
        return attendanceService.generateQr(attendance.getQrCode());
    }

    @GetMapping("/scan")
    public ResponseEntity<String> scanQr(@RequestParam String token){
        return attendanceService.scanQR(token);
    }
}
