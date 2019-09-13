package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import com.fcode.FcodeTrainC.service.AccountCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
public class AccountCourseController {
    @Autowired
    AccountCourseService service;

    @GetMapping(value = "/auth/account_course/{courseId}")
    public Collection<AccountCourse> getListAccInCourse(@PathVariable Integer courseId) {
        return service.getListAccountInCourse(courseId);
    }

    @GetMapping(value = "/auth/account_course/availableAccount4Course/{courseId}/{username}")
    public List<Account> getListAvaiAcc4Course(@PathVariable("courseId") Integer courseId, @PathVariable("username") String username) {
        return service.availableAccountToCourse(username, courseId);
    }

    @PostMapping(value = "/auth/account_course/{courseId}/{username}")
    public ResponseEntity<AccountCourse> add(@PathVariable("courseId") Integer courseId, @PathVariable("username") String username) {
        AccountCourse accountCourse = service.addNew(courseId, username);
        return new ResponseEntity<>(accountCourse, HttpStatus.CREATED);
    }
}
