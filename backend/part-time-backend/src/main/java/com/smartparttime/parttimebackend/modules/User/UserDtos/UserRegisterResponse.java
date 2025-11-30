package com.smartparttime.parttimebackend.modules.User.UserDtos;

import lombok.Data;

@Data
public class UserRegisterResponse {
    private Long id;
    private String name;
    private String email;

}
