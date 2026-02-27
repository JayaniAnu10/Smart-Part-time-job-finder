package com.smartparttime.parttimebackend.modules.User.UserDtos;

import java.util.UUID;

public class ComplaintRequest {
    public UUID reporterId;
    public UUID targetId;
    public Integer typeId;
    public String description;
}
