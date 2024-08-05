package com.niit.TaskService.service;

import com.niit.TaskService.domain.Status;
import com.niit.TaskService.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatusServiceImpl implements StatusService{
    private final StatusRepository statusRepository;
    @Autowired
    public StatusServiceImpl(StatusRepository statusRepository){this.statusRepository = statusRepository;}

    @Override
    public Status createStatus(Status status) {
        return statusRepository.save(status);
    }

    @Override
    public Optional<Status> getStatusByStatusCode(String statusCode) {
        return statusRepository.findById(statusCode);
    }

    @Override
    public List<Status> getAllStatus() {
        return statusRepository.findAll();
    }
}
