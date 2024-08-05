package com.niit.TaskService.controller;

import com.niit.TaskService.domain.Status;
import com.niit.TaskService.domain.Task;
import com.niit.TaskService.exception.TaskNotFoundException;
import com.niit.TaskService.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/status")
public class StatusController {
    private final StatusService statusService;
    private ResponseEntity<?> responseEntity;
    @Autowired
    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @PostMapping
    public ResponseEntity<Status> createTask(@RequestBody Status status) {
        Status createdStatus = statusService.createStatus(status);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStatus);
    }

    @GetMapping("/{statusCode}")
    public ResponseEntity<Optional<Status>> getStatusByStatusCode(@PathVariable String statusCode) {
        Optional<Status> status = statusService.getStatusByStatusCode(statusCode);
        return ResponseEntity.ok(status);
    }

    @GetMapping
    public ResponseEntity<List<Status>> getAllStatus() {
        List<Status> statuses = statusService.getAllStatus();
        return ResponseEntity.ok(statuses);
    }
}
