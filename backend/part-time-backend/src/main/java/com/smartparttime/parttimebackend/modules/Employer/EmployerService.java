package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.common.imageStorage.AzureImageStorageClient;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.UpdateEmployerRequest;
import com.smartparttime.parttimebackend.modules.User.*;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
import com.smartparttime.parttimebackend.modules.User.UserExceptions.PasswordMismatchException;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@AllArgsConstructor
@Service
public class EmployerService {
    private final EmployerRepository employerRepository;
    private final EmployerMapper employerMapper;
    private final UserMapper userMapper;
    private final UserService userService;
    private final UserRepository userRepository;
    private final AzureImageStorageClient imageStorageClient;

    @Transactional
    public UserRegisterResponse addEmployee(@Valid EmployerRegisterRequest request, MultipartFile logo) throws IOException {
        availabilityCheck(request.getEmail(), request.getRegistrationId());

        if(!request.getPassword().equals(request.getConfirmPassword())){
            throw new PasswordMismatchException("Passwords do not match");
        }

        var user = userMapper.employeeToEntity(request);
        user.setRole(Role.EMPLOYER);
        var savedUser = userService.registerUser(user);

        var emp=employerMapper.toEntity(request);
        emp.setUser(savedUser);

        if (logo != null && !logo.isEmpty()) {
            uploadImage(logo,emp);
        }

        employerRepository.save(emp);

        return userMapper.toResponse(savedUser);
    }


    public Employer getEmployerById(UUID id) {
        var employer = employerRepository.findById(id).orElse(null);
        if(employer == null){
            throw new NotFoundException("User not found");
        }
        return employer;
    }


    public User updateEmployer(UpdateEmployerRequest request, UUID id) {
        var employer=employerRepository.findById(id).orElse(null);
        if(employer==null){
            throw new NotFoundException("User not found");
        }

        availabilityCheck(request.getEmail(), request.getRegistrationId());

        employerMapper.update(request,employer);
        employerRepository.save(employer);
        return userRepository.findById(employer.getId()).orElseThrow();
    }


    @Transactional
    public void updateProfile(MultipartFile logo,UUID id) throws IOException {
        var employer = employerRepository.findById(id).orElseThrow();
        var oldImageUrl = employer.getLogo();
        boolean isImageUpdated =  false;

        if(logo!=null && !logo.isEmpty()){
            uploadImage(logo, employer);
            isImageUpdated = true;
        }

        employerRepository.save(employer);

        if (isImageUpdated && oldImageUrl!= null) {
            imageStorageClient.deleteImage(oldImageUrl);
        }
    }



    private void uploadImage(MultipartFile logo, Employer employer) throws IOException {
        String originalFilename = logo.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            originalFilename = "unknown_file.jpg";
        }

        String containerName="blob-posts";
        try(InputStream inputStream= logo.getInputStream()){
            String contentType = logo.getContentType();
            String imageUrl= imageStorageClient.uploadImage(containerName, originalFilename,inputStream,contentType);
            employer.setLogo(imageUrl);
        }
    }


    public ResponseEntity<Void> deleteEmployer(UUID id) {
        var employer = employerRepository.findById(id).orElse(null);
        if(employer == null){
            return ResponseEntity.notFound().build();
        }
        employerRepository.deleteById(id);
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void availabilityCheck(String email, String registrationId) {
        if (userRepository.existsUserByEmail(email)) {
            throw new BadRequestException("Email already exists");
        }

        if (employerRepository.existsByRegistrationId(registrationId)) {
            throw new BadRequestException("Registration id already exists");
        }
    }
}
