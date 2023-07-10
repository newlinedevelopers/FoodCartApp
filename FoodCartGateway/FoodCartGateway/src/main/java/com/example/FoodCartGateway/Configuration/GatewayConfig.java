package com.example.FoodCartGateway.Configuration;

import org.springframework.cloud.gateway.config.GlobalCorsProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {
    @Bean
    public GlobalCorsProperties globalCorsProperties(){
        return new GlobalCorsProperties();
    }
}
