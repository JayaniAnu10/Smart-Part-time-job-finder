package com.smartparttime.parttimebackend.modules.Chatbot.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartparttime.parttimebackend.common.Services.EmbeddingService;
import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.InternalServerException;
import com.smartparttime.parttimebackend.modules.Chatbot.Dto.ChatMessage;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import lombok.AllArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.ChatMemoryRepository;
import org.springframework.ai.chat.memory.InMemoryChatMemoryRepository;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;


@AllArgsConstructor
@Service
public class ChatbotService {
    private final ChatModel chatModel;
    private final JobRepo jobRepository;
    private final ChatMemoryRepository memoryRepository = new InMemoryChatMemoryRepository();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final EmbeddingService embeddingService;

    public void clearHistory(String sessionId) {
        memoryRepository.deleteByConversationId(sessionId);
    }

    public String generateResponse(String sessionId,ChatMessage prompt){
        if(prompt.getPrompt()==null){
            throw new IllegalArgumentException("Prompt message is null.");
        }

        List<Float> userEmbedding = embeddingService.getEmbedding(prompt.getPrompt());

        Job bestJob = jobRepository.findAll().stream()
                .filter(job -> job.getEmbedding() != null)
                .max(Comparator.comparingDouble(job -> {
                    try {
                        List<Float> jobVec = objectMapper.readValue(job.getEmbedding(), new TypeReference<List<Float>>() {});
                        return cosineSimilarity(userEmbedding, jobVec);
                    } catch (Exception e) {
                        return 0.0;
                    }
                }))
                .orElse(null);

        String context = "";

        if (bestJob != null) {
            context = String.format("""
            Job Id: %s
            Job Title: %s
            Job schedules: %s
            Location: %s
            Job Type: %s
            Min Salary: %s
            Max Salary: %s
            Description: %s
            Deadline(When): %s
            Requirements: %s
            Available vacancies: %s
            """,
                    bestJob.getId(),
                    bestJob.getTitle(),
                    bestJob.getJobSchedules(),
                    bestJob.getLocation(),
                    bestJob.getJobType(),
                    bestJob.getMinSalary(),
                    bestJob.getMaxSalary(),
                    bestJob.getDescription(),
                    bestJob.getDeadline(),
                    bestJob.getRequirements(),
                    bestJob.getAvailableVacancies()
            );
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
                    .system(ChatbotPrompts.SYSTEM_PROMPT.formatted(context))
                    .user(prompt.getPrompt())
                    .call()
                    .content();
        }catch (BadRequestException e){
            throw new InternalServerException("Failed to generate response.Try again.");
        }



    }

    private double cosineSimilarity(List<Float> vec1, List<Float> vec2) {
        double dot = 0.0, normA = 0.0, normB = 0.0;
        for (int i = 0; i < vec1.size(); i++) {
            dot += vec1.get(i) * vec2.get(i);
            normA += Math.pow(vec1.get(i), 2);
            normB += Math.pow(vec2.get(i), 2);
        }
        return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
