package com.niit.TaskService;

import com.niit.TaskService.controller.TaskController;
import com.niit.TaskService.domain.Status;
import com.niit.TaskService.domain.Task;
import com.niit.TaskService.exception.TaskNotFoundException;
import com.niit.TaskService.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testCreateTask() {
        Task task = new Task();
        when(taskService.createTask(any(Task.class))).thenReturn(task);

        ResponseEntity<Task> responseEntity = taskController.createTask(task);

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(task, responseEntity.getBody());
        verify(taskService, times(1)).createTask(task);
    }

    @Test
    public void testUpdateTask() throws TaskNotFoundException {
        Task task = new Task();
        task.setTaskId("1");

        when(taskService.updateTask("1", task)).thenReturn(task);

        ResponseEntity<Task> responseEntity = taskController.updateTask("1", task);

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(task, responseEntity.getBody());
        verify(taskService, times(1)).updateTask("1", task);
    }

    @Test
    public void testGetTaskById() throws TaskNotFoundException {
        Task task = new Task();
        task.setTaskId("1");

        when(taskService.getTaskById("1")).thenReturn(task);

        ResponseEntity<Task> responseEntity = taskController.getTaskById("1");

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(task, responseEntity.getBody());
        verify(taskService, times(1)).getTaskById("1");
    }

    @Test
    public void testGetAllTasks() {
        List<Task> tasks = new ArrayList<>();
        tasks.add(new Task());
        tasks.add(new Task());

        when(taskService.getAllTasks()).thenReturn(tasks);

        ResponseEntity<List<Task>> responseEntity = taskController.getAllTasks();

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(tasks, responseEntity.getBody());
        verify(taskService, times(1)).getAllTasks();
    }

    @Test
    public void testDeleteTask() throws TaskNotFoundException {
        ResponseEntity<String> responseEntity = taskController.deleteTask("1");

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Task deleted successfully", responseEntity.getBody());
        verify(taskService, times(1)).deleteTask("1");
    }

    @Test
    public void testGetAllStatusByTaskId() throws TaskNotFoundException {
        List<Status> statuses = new ArrayList<>();
        statuses.add(new Status());

        when(taskService.getAllStatusByTaskId("1")).thenReturn(statuses);

        ResponseEntity<?> responseEntity = taskController.getAllStatusByTaskId("1");

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(statuses, responseEntity.getBody());
        verify(taskService, times(1)).getAllStatusByTaskId("1");
    }

    @Test
    public void testGetAllStatusByTaskId_TaskNotFound() throws TaskNotFoundException {
        when(taskService.getAllStatusByTaskId("1")).thenThrow(new TaskNotFoundException());

        assertThrows(TaskNotFoundException.class, () -> taskController.getAllStatusByTaskId("1"));
        verify(taskService, times(1)).getAllStatusByTaskId("1");
    }
}
