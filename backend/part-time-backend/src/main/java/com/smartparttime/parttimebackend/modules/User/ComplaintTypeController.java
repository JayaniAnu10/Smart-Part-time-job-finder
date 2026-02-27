package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.User.entities.ComplaintType;
import com.smartparttime.parttimebackend.modules.User.repo.ComplaintTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaint-types")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintTypeController {

    private final ComplaintTypeRepository complaintTypeRepository;

    @GetMapping
    public List<ComplaintType> getAllComplaintTypes() {
        return complaintTypeRepository.findAll();
    }
}
