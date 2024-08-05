package com.niit.TaskService.service;

import com.niit.TaskService.domain.Status;
import com.niit.TaskService.domain.Task;
import com.niit.TaskService.exception.TaskNotFoundException;

import java.util.List;

public interface TaskService {
    Task createTask(Task task);
    Task updateTask(String taskId, Task updatedTask) throws TaskNotFoundException;
    Task getTaskById(String taskId) throws TaskNotFoundException;
    List<Task> getAllTasks();
    void deleteTask(String taskId) throws TaskNotFoundException;
    List<Status> getAllStatusByTaskId(String taskId) throws TaskNotFoundException;

}
