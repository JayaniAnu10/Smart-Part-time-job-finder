package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.*;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class JobSeekerService {
    private final JobSeekerMapper jobSeekerMapper;
    private final UserMapper userMapper;
    private final JobSeekerRepository jobSeekerRepository;
    private final UserService userService;

    public UserRegisterResponse addSeeker(@Valid JobSeekerRegisterRequest request) {
        var user = userMapper.seekerToEntity(request);
        user.setRole(Role.JOBSEEKER);
        var savedUser = userService.registerUser(user);

        var seeker=jobSeekerMapper.toEntity(request);
        seeker.setUser(savedUser);
        jobSeekerRepository.save(seeker);

        return userMapper.toResponse(savedUser);
    }

}
