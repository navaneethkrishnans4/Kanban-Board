package com.niit.TaskService.repository;

import com.niit.TaskService.domain.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task,String> {
    Task findByTaskId(String taskId);
}
