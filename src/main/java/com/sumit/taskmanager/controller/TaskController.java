package com.sumit.taskmanager.controller;

import com.sumit.taskmanager.model.Task;
import com.sumit.taskmanager.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins="*")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Create task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get tasks by user ID
    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUser(@PathVariable Long userId) {
        return taskRepository.findByUserId(userId);
    }

    // Get task by ID
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id).orElseThrow();
    }

    // Update task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        return taskRepository.save(task);
    }

    // Delete task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}