package com.example.RegistrationApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.logging.Logger;

@SpringBootApplication
public class RegistrationApplication {
	private static final Logger LOGGER = Logger.getLogger(RegistrationApplication.class.getName());
	public static void main(String[] args) {
		SpringApplication.run(RegistrationApplication.class, args);
		LOGGER.info("main method executed");
	}
}
