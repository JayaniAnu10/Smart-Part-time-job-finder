package com.smartparttime.parttimebackend.modules.Chatbot.Service;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.InternalServerException;
import com.smartparttime.parttimebackend.modules.Chatbot.Dto.ChatMessage;
import lombok.AllArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.ChatMemoryRepository;
import org.springframework.ai.chat.memory.InMemoryChatMemoryRepository;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class ChatbotService {
    private final ChatModel chatModel;
    private final ChatMemoryRepository memoryRepository = new InMemoryChatMemoryRepository();

    public void clearHistory(String sessionId) {
        memoryRepository.deleteByConversationId(sessionId);
    }

    public String generateResponse(String sessionId,ChatMessage prompt){
        if(prompt.getPrompt()==null){
            throw new IllegalArgumentException("Prompt message is null.");
        }
        try{
            ChatMemory memory = MessageWindowChatMemory.builder()
                    .chatMemoryRepository(memoryRepository)
                    .maxMessages(100)
                    .build();


            ChatClient chatClient = ChatClient.builder(chatModel)
                    .defaultAdvisors(
                            MessageChatMemoryAdvisor.builder(memory).build()
                    )
                    .build();

            return chatClient.prompt()
                    .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, sessionId))
                    .user(prompt.getPrompt())
                    .call()
                    .content();
        }catch (BadRequestException e){
            throw new InternalServerException("Failed to generate response.Try again.");
        }



    }
}
