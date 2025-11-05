package com.example.task_api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Generates getters, setters, toString, etc.
@AllArgsConstructor // Generates a constructor with all fields
@NoArgsConstructor  // Needed for JSON (de)serialization
public class Task {
    private long id;
    private String title;
    private boolean completed;
}
