package com.niit.TaskService.service;

import com.niit.TaskService.domain.Status;

import java.util.List;
import java.util.Optional;

public interface StatusService {

    Status createStatus(Status status);
    Optional<Status> getStatusByStatusCode(String statusCode);
    List<Status> getAllStatus();
}
