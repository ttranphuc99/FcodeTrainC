package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.AccountCourse;
import com.fcode.FcodeTrainC.service.AccountCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
public class AccountCourseController {
    @Autowired
    AccountCourseService service;

    @GetMapping(value = "/auth/account_course/{courseId}")
    public Collection<AccountCourse> getListAccInCourse(@PathVariable Integer courseId) {
        return service.getListAccountInCourse(courseId);
    }
}
