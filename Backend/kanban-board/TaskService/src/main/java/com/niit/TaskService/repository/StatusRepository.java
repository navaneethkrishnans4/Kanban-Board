package com.niit.TaskService.repository;

import com.niit.TaskService.domain.Status;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface StatusRepository extends MongoRepository<Status,String> {
    Optional<Status> findById(String statusCode);
}
