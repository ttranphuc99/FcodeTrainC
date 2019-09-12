package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import com.fcode.FcodeTrainC.repository.AccountCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class AccountCourseService {
    @Autowired
    private AccountCourseRepository repository;

    public AccountCourse save(AccountCourse accountCourse) {
        return repository.save(accountCourse);
    }

    public Collection<AccountCourse> getListAccountInCourse(Integer courseId) {
        return repository.findByIdCourseId(courseId);
    }

    public List<Account> availableAccountToCourse(String username, Integer courseId) {
        return repository.availableAccountToCourse(username, courseId);
    }
}
