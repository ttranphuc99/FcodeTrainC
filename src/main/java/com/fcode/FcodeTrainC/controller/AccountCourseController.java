package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import com.fcode.FcodeTrainC.service.AccountCourseService;
import com.fcode.FcodeTrainC.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

@RestController
public class AccountCourseController {
    @Autowired
    AccountCourseService service;
    @Autowired
    AccountService accountService;

    @GetMapping(value = "/auth/account_course/{courseId}")
    public Collection<AccountCourse> getListAccInCourse(@PathVariable Integer courseId) {
        return service.getListAccountInCourse(courseId);
    }

    @GetMapping(value = "/auth/account_course/availableAccount4Course/{courseId}/{username}")
    public List<Account> getListAvaiAcc4Course(@PathVariable("courseId") Integer courseId, @PathVariable("username") String username) {
        return service.availableAccountToCourse(username, courseId);
    }

    @PostMapping(value = "/auth/account_course/{courseId}/{username}")
    public ResponseEntity<AccountCourse> add(@PathVariable("courseId") Integer courseId, @PathVariable("username") String username, Authentication authentication) {
        Account account = accountService.findByUsername(authentication.getName());
        AccountCourse accountCourse = service.addNew(courseId, username, account);

        return new ResponseEntity<>(accountCourse, HttpStatus.CREATED);
    }

    @GetMapping(value = "/member/course")
    public ResponseEntity getListCourseOfMem(Authentication authentication) {
        HashMap<String, Object> map = null;
        List result = new ArrayList();

        List<AccountCourse> list = service.getListCourseOfAnAccount(authentication.getName());
        for (AccountCourse accountCourse : list) {
            map = new HashMap<>();
            map.put("id", accountCourse.getId().getCourse().getId());
            map.put("name", accountCourse.getId().getCourse().getName());
            map.put("status", accountCourse.getId().getCourse().getStatus());
            map.put("joinedTime", accountCourse.getCreatedTime());
            result.add(map);
        }

        return new ResponseEntity(result, HttpStatus.OK);
    }
}
