package com.niit.UserRegistrationService.service;

import com.niit.UserRegistrationService.domain.User;
import com.niit.UserRegistrationService.exception.UserAlreadyExistsException;
import com.niit.UserRegistrationService.exception.UserNotFoundException;
import com.niit.UserRegistrationService.proxy.UserProxy;
import com.niit.UserRegistrationService.repository.UserTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserTaskServiceImpl implements UserTaskService {
    private UserTaskRepository userTaskRepository;
    private UserProxy userProxy;
    @Autowired
    public UserTaskServiceImpl(UserTaskRepository userTaskRepository, UserProxy userProxy) {
        this.userTaskRepository = userTaskRepository;
        this.userProxy = userProxy;
    }
    @Override
    public User registerUser(User user) throws UserAlreadyExistsException {
        if(userTaskRepository.findByEmailId(user.getEmailId())!=null)
        {
            throw new UserAlreadyExistsException();
        }
        User savedUser = userTaskRepository.save(user);
        if(!(savedUser.getEmailId().isEmpty())) {
            ResponseEntity<?> r = userProxy.saveUser(user);
            System.out.println(r.getBody());
        }
        return savedUser;
    }

    @Override
    public User findByUserEmailId(String userEmailId) throws UserNotFoundException {
        return userTaskRepository.findByEmailId(userEmailId);
}
 @Override
    public List<User> getAllUserData(String userId) throws UserNotFoundException {
        User optionalUser = userTaskRepository.findByEmailId(userId);
        if (optionalUser != null) {
            return userTaskRepository.findAll();
        } else {
            throw new UserNotFoundException();
        }
    }



}
