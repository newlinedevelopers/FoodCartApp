package com.example.FoodOrderFC.EmailServiceFC;

import feign.Feign;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.context.annotation.Bean;

@LoadBalancerClient(value = "EmailServiceFC")
public class EmailServicesLoadBalancer {
    @LoadBalanced
    @Bean
    public Feign.Builder feign(){
        return Feign.builder();
    }
}
