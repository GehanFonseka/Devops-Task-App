package com.example.task_api;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/api")
public class TaskController {

    private final Map<Long, Task> store = new ConcurrentHashMap<>();
    private final AtomicLong idGen = new AtomicLong(0);

    @PostConstruct
    void seed() {
        // Initial demo tasks (including a Deploy task)
        createInternal(new Task(0, "Build the Spring Boot backend", true));
        createInternal(new Task(0, "Create the React frontend", true));
        createInternal(new Task(0, "Connect frontend to backend", true));
        createInternal(new Task(0, "Deploy to GKE", true));
    }

    // Utility: assign ID and save without exposing as endpoint
    private Task createInternal(Task t) {
        long id = idGen.incrementAndGet();
        Task toSave = new Task(id, t.getTitle(), t.isCompleted());
        store.put(id, toSave);
        return toSave;
    }

    // GET /api/tasks
    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return store.values().stream()
                .sorted(Comparator.comparingLong(Task::getId))
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    // POST /api/tasks
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/tasks")
    public Task createTask(@RequestBody Task task) {
        String title = task.getTitle() == null ? "Untitled Task" : task.getTitle().trim();
        boolean completed = task.isCompleted();
        return createInternal(new Task(0, title, completed));
    }

    // PUT /api/tasks/{id}
    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable long id, @RequestBody Task task) {
        Task existing = store.get(id);
        if (existing == null) {
            throw new TaskNotFoundException(id);
        }
        String title = task.getTitle() == null ? existing.getTitle() : task.getTitle().trim();
        boolean completed = task.isCompleted();
        Task updated = new Task(id, title, completed);
        store.put(id, updated);
        return updated;
    }

    // DELETE /api/tasks/{id}
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable long id) {
        if (store.remove(id) == null) {
            throw new TaskNotFoundException(id);
        }
    }

    // PUT /api/tasks/mark-all-completed
    @PutMapping("/tasks/mark-all-completed")
    public List<Task> markAllCompleted() {
        store.replaceAll((id, t) -> new Task(id, t.getTitle(), true));
        return getAllTasks();
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    static class TaskNotFoundException extends RuntimeException {
        TaskNotFoundException(long id) { super("Task " + id + " not found"); }
    }
}
