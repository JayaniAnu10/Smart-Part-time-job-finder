package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.User.UserDtos.ComplaintRequest;
import com.smartparttime.parttimebackend.modules.User.ComplaintCreateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/complaints")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    private final ComplaintCreateService complaintCreateService;

    @PostMapping
    public ResponseEntity<?> createComplaint(
            @RequestBody ComplaintRequest request
    ) {
        complaintCreateService.create(request);
        return ResponseEntity.ok("Complaint submitted successfully");
    }
}
