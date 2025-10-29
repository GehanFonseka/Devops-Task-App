package com.example.task_api;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data // Generates getters, setters, toString, etc.
@AllArgsConstructor // Generates a constructor with all fields
public class Task {
    private long id;
    private String title;
    private boolean completed;
}
