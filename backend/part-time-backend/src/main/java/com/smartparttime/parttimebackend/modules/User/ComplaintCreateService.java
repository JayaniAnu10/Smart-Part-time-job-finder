package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.User.UserDtos.ComplaintRequest;
import com.smartparttime.parttimebackend.modules.User.entities.Complaint;
import com.smartparttime.parttimebackend.modules.User.entities.ComplaintType;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import com.smartparttime.parttimebackend.modules.User.repo.ComplaintRepository;
import com.smartparttime.parttimebackend.modules.User.repo.ComplaintTypeRepository;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ComplaintCreateService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final ComplaintTypeRepository complaintTypeRepository;

    public void create(ComplaintRequest request) {

        User reporter = userRepository.findById(request.reporterId)
                .orElseThrow(() -> new RuntimeException("Reporter not found"));

        User target = userRepository.findById(request.targetId)
                .orElseThrow(() -> new RuntimeException("Target not found"));

        ComplaintType type = complaintTypeRepository.findById(request.typeId)
                .orElseThrow(() -> new RuntimeException("Complaint type not found"));

        Complaint complaint = new Complaint();
        complaint.setReporter(reporter);
        complaint.setTarget(target);
        complaint.setType(type);
        complaint.setDescription(request.description);
        complaint.setStatus("PENDING");
        complaint.setCreatedAt(LocalDateTime.now());

        complaintRepository.save(complaint);
    }
}
