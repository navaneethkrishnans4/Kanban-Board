package com.niit.TaskService;

import com.niit.TaskService.domain.Status;
import com.niit.TaskService.domain.Task;
import com.niit.TaskService.exception.TaskNotFoundException;
import com.niit.TaskService.repository.TaskRepository;
import com.niit.TaskService.service.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testCreateTask() {
        Task task = new Task();
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task createdTask = taskService.createTask(task);

        assertNotNull(createdTask);
        assertEquals(task, createdTask);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    public void testUpdateTask_TaskExists() throws TaskNotFoundException {
        Task task = new Task();
        task.setTaskId("1");

        when(taskRepository.findById("1")).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task updatedTask = taskService.updateTask("1", task);

        assertNotNull(updatedTask);
        assertEquals(task, updatedTask);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    public void testUpdateTask_TaskNotFound() {
        when(taskRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.updateTask("1", new Task()));
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    public void testGetTaskById_TaskExists() throws TaskNotFoundException {
        Task task = new Task();
        task.setTaskId("1");

        when(taskRepository.findById("1")).thenReturn(Optional.of(task));

        Task foundTask = taskService.getTaskById("1");

        assertNotNull(foundTask);
        assertEquals(task, foundTask);
    }

    @Test
    public void testGetTaskById_TaskNotFound() {
        when(taskRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.getTaskById("1"));
    }

    @Test
    public void testGetAllTasks() {
        List<Task> tasks = new ArrayList<>();
        tasks.add(new Task());
        tasks.add(new Task());

        when(taskRepository.findAll()).thenReturn(tasks);

        List<Task> foundTasks = taskService.getAllTasks();

        assertNotNull(foundTasks);
        assertEquals(tasks.size(), foundTasks.size());
        assertEquals(tasks, foundTasks);
    }

    @Test
    public void testDeleteTask_TaskExists() throws TaskNotFoundException {
        Task task = new Task();
        task.setTaskId("1");

        when(taskRepository.findById("1")).thenReturn(Optional.of(task));

        taskService.deleteTask("1");

        verify(taskRepository, times(1)).deleteById("1");
    }

    @Test
    public void testDeleteTask_TaskNotFound() {
        when(taskRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.deleteTask("1"));
        verify(taskRepository, never()).deleteById("1");
    }

    @Test
    public void testGetAllStatusByTaskId_TaskExists() throws TaskNotFoundException {
        Task task = new Task();
        List<Status> statuses = new ArrayList<>();
        statuses.add(new Status());
        task.setStatusList(statuses);

        when(taskRepository.findById("1")).thenReturn(Optional.of(task));

        List<Status> foundStatuses = taskService.getAllStatusByTaskId("1");

        assertNotNull(foundStatuses);
        assertEquals(statuses.size(), foundStatuses.size());
        assertEquals(statuses, foundStatuses);
    }

    @Test
    public void testGetAllStatusByTaskId_TaskNotFound() {
        when(taskRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.getAllStatusByTaskId("1"));
    }
}
