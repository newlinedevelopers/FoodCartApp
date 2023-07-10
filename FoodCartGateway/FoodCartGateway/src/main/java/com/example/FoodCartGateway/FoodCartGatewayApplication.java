package com.example.FoodCartGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class FoodCartGatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(FoodCartGatewayApplication.class, args);
	}
}
