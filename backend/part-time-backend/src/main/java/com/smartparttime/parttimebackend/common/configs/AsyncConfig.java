package com.smartparttime.parttimebackend.common.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "taskExecutor")
    public Executor jobApplicationExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);        // minimum threads
        executor.setMaxPoolSize(20);         // maximum threads
        executor.setQueueCapacity(100);       // queue jobs before using threads
        executor.setThreadNamePrefix("JobApp-");
        executor.initialize();
        return executor;
    }
}
