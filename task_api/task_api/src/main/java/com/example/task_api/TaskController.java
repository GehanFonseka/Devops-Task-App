package com.example.task_api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api") // All endpoints in this class will start with /api
public class TaskController {

    @GetMapping("/tasks") // Responds to GET http://localhost:8080/api/tasks
    public List<Task> getAllTasks() {
        // We'll hardcode the list for simplicity
        return List.of(
                new Task(1, "Build the Spring Boot backend", true),
                new Task(2, "Create the React frontend", false),
                new Task(3, "Connect frontend to backend", false)
        );
    }
}
