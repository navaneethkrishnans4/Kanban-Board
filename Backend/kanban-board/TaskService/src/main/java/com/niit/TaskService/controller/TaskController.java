package com.niit.TaskService.controller;

import com.niit.TaskService.domain.Status;
import com.niit.TaskService.domain.Task;
import com.niit.TaskService.exception.TaskNotFoundException;
import com.niit.TaskService.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;
    private ResponseEntity<?> responseEntity;
    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable String taskId, @RequestBody Task updatedTask) throws TaskNotFoundException {
        Task updated = taskService.updateTask(taskId, updatedTask);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable String taskId) throws TaskNotFoundException {
        Task task = taskService.getTaskById(taskId);
        return ResponseEntity.ok(task);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable String taskId) throws TaskNotFoundException {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully");
    }

    @GetMapping("/{taskId}/statuses")
    public ResponseEntity<?> getAllStatusByTaskId(@PathVariable String taskId) throws TaskNotFoundException {
        try{
            responseEntity = new ResponseEntity<>(taskService.getAllStatusByTaskId(taskId), HttpStatus.OK);
        }catch(TaskNotFoundException e)
        {
            throw new TaskNotFoundException();
        }
        return responseEntity;
    }
}
