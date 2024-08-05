package com.niit.TaskService.service;

import com.niit.TaskService.domain.Status;
import com.niit.TaskService.domain.Task;
import com.niit.TaskService.exception.TaskNotFoundException;
import com.niit.TaskService.repository.StatusRepository;
import com.niit.TaskService.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class TaskServiceImpl implements TaskService{
    private final TaskRepository taskRepository;


    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
      @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(String taskId, Task updatedTask) throws TaskNotFoundException {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTaskTitle(updatedTask.getTaskTitle());
            existingTask.setTaskDescription(updatedTask.getTaskDescription());
            existingTask.setPriority(updatedTask.getPriority());
            existingTask.setEmailId(updatedTask.getEmailId());
            existingTask.setTimeSpent(updatedTask.getTimeSpent());
            existingTask.setStatusCode(updatedTask.getStatusCode());
            existingTask.setStatusList(updatedTask.getStatusList());
            existingTask.setDueDate(updatedTask.getDueDate());
            return taskRepository.save(existingTask);
        } else {
            throw new TaskNotFoundException();
        }
    }

    @Override
    public Task getTaskById(String taskId) throws TaskNotFoundException {
        return taskRepository.findById(taskId)
                .orElseThrow(TaskNotFoundException::new);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public void deleteTask(String taskId) throws TaskNotFoundException {
       Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            taskRepository.deleteById(taskId);
        } else {
            throw new TaskNotFoundException();
        }
    }
    @Override
    public List<Status> getAllStatusByTaskId(String taskId) throws TaskNotFoundException{
        Task task = taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
        return task.getStatusList();
    }


}
