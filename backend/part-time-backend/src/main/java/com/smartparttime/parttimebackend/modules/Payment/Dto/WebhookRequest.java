package com.smartparttime.parttimebackend.modules.Payment.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@AllArgsConstructor
@Data
public class WebhookRequest {
    private Map<String,String> headers;
    private String payload;
}
