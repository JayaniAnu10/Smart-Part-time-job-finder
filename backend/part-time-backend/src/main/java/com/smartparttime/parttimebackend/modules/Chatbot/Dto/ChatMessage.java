package com.smartparttime.parttimebackend.modules.Chatbot.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChatMessage {

    @NotBlank(message = "Ask something")
    private String prompt;
}
