package com.smartparttime.parttimebackend.modules.Chatbot.Controller;

import com.smartparttime.parttimebackend.modules.Chatbot.Dto.ChatMessage;
import com.smartparttime.parttimebackend.modules.Chatbot.Service.ChatbotService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatbotController {
    private final ChatbotService chatService;


    @PostMapping("/{sessionId}")
    public ResponseEntity<String> generateResponse(
            @PathVariable String sessionId,
            @RequestBody ChatMessage prompt
    ){
        String responseText = chatService.generateResponse(sessionId,prompt);
        return ResponseEntity.ok(responseText);
    }

    @PostMapping("/{sessionId}/clear")
    public ResponseEntity<String> clearHistory(@PathVariable String sessionId) {
        chatService.clearHistory(sessionId);
        return ResponseEntity.ok("Conversation history cleared.");
    }
}
