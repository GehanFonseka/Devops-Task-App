package com.example.task_api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") // All endpoints in this class will start with /api
public class TaskController {

    @GetMapping("/tasks") // Responds to GET http://localhost:8080/api/tasks
    public List<Task> getAllTasks() {
        // We'll hardcode the list for simplicity
       return List.of(
    // --- Local Development & Core API Setup ---
    new Task(1, "Initialize Spring Boot Project (Web, Lombok)", true),
    new Task(2, "Create Task Data Model (Task.java)", true),
    new Task(3, "Implement TaskController with GET /api/tasks Endpoint", true),
    new Task(4, "Configure Global CORS for Local React App (http://localhost:3000)", true),
    
    // --- Readiness & Containerization (GKE Dependency) ---
    new Task(5, "Add Spring Boot Actuator Dependency", true),
    new Task(6, "Implement Multi-stage Dockerfile for Backend JAR", true),

    // --- VM Deployment Automation Tasks ---
    new Task(7, "Prepare systemd Service File for VM Runtime", true),
    new Task(8, "Configure Nginx Reverse Proxy on VM for /api Traffic", true),
    new Task(9, "Set up GitHub Actions: Build Backend JAR and SCP to VM", true),
    new Task(10, "Set up GitHub Actions: SSH into VM and Restart systemd Service", true),

    // --- GKE Deployment Automation Tasks ---
    new Task(11, "Create Kubernetes Deployment Manifest (Deployment & Readiness Probe)", true),
    new Task(12, "Create Kubernetes Service Manifest (ClusterIP)", true),
    new Task(13, "Set up GitHub Actions: Build & Push Docker Image to GCR", true),
    new Task(14, "Set up GitHub Actions: Apply K8s Manifests to GKE Cluster", true)
);
    }
}
