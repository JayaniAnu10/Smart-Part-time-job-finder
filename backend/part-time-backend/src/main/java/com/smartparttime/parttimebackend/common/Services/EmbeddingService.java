package com.smartparttime.parttimebackend.common.Services;

import lombok.AllArgsConstructor;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class EmbeddingService {

    private final EmbeddingModel embeddingModel;

    public List<Float> getEmbedding(String text) {
        float[] vector = embeddingModel.embed(text);

        List<Float> result = new ArrayList<>(vector.length);
        for (float v : vector) {
            result.add(v);
        }
        return result;
    }
}
