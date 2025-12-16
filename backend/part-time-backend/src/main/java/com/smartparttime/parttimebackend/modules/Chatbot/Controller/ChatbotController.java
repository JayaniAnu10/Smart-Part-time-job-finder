package com.smartparttime.parttimebackend.modules.Chatbot.Controller;

import com.smartparttime.parttimebackend.modules.Chatbot.Dto.ChatMessage;
import com.smartparttime.parttimebackend.modules.Chatbot.Service.ChatbotService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@AllArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatbotController {
    private final ChatbotService chatService;


    @PostMapping
    public ResponseEntity<Map<String,String>> generateResponse(
            @Valid @RequestBody ChatMessage prompt
    ){
        String responseText = chatService.generateResponse(prompt.getConversationId(),prompt);
        return ResponseEntity.ok(Map.of("message", responseText));
    }

    @PostMapping("/{sessionId}/clear")
    public ResponseEntity<String> clearHistory(@PathVariable String sessionId) {
        chatService.clearHistory(sessionId);
        return ResponseEntity.ok("Conversation history cleared.");
    }
}
