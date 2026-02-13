package com.smartparttime.parttimebackend.modules.Attendance;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public byte[] generateQr(String qrToken) throws WriterException, IOException {

        String url = "/api/attendance/scan?token="+ qrToken;

        BitMatrix matrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, 300, 300);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(matrix, "PNG", out);
        return out.toByteArray();
    }

    public ResponseEntity<String> scanQR(String token) {
        var attendance = attendanceRepository.findByQrCode(token);

        if (attendance == null) {
            throw new BadRequestException("Invalid QR code: Attendance record not found.");
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime = attendance.getSchedule().getStartDatetime();
        LocalDateTime endTime = attendance.getSchedule().getEndDatetime();


        if(attendance.getStatus() == AttendanceStatus.PENDING){
            if (now.isAfter(endTime)) {
                throw new BadRequestException("Cannot check in. The shift ended at " + endTime);
            }

            if(now.isBefore(startTime.minusHours(1))){
                throw new BadRequestException("Too early .Cannot check in. The shift start at " + startTime);
            }

            attendance.setCheckInTime(LocalDateTime.now());
            attendance.setStatus(AttendanceStatus.CHECKED_IN);
            attendanceRepository.save(attendance);
            return ResponseEntity.ok("Check in successfully");
        }

        if (attendance.getStatus() == AttendanceStatus.CHECKED_IN) {
            if(now.isAfter(endTime.plusHours(8))) {
                throw new BadRequestException("Check-out failed: Too much time has passed since shift end.");
            }
            attendance.setCheckOutTime(LocalDateTime.now());
            attendance.setStatus(AttendanceStatus.CHECKED_OUT);
            attendanceRepository.save(attendance);
            return ResponseEntity.ok("Check-out successful");
        }



        return ResponseEntity.badRequest().body("Attendance already completed");
    }
}
