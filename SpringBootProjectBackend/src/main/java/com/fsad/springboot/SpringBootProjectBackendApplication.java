package com.fsad.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootProjectBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootProjectBackendApplication.class, args);
		System.out.println("Running in port 2004 ram");
	}

}
