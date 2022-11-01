package com.example.demo.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;

@Configuration
public class StudentConfig {
    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository){
        return args -> {
            Student maria = new Student(
                    1L,
                    "maria",
                    "maria@gmail.com",
                    LocalDate.of(2000, Month.JANUARY, 20)
            );

            repository.save(maria);
        };

    }
}
