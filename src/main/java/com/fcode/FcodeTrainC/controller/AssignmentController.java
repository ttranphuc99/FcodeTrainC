package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.Assignment;
import com.fcode.FcodeTrainC.entity.Course;
import com.fcode.FcodeTrainC.service.AccountService;
import com.fcode.FcodeTrainC.service.AssignmentService;
import com.fcode.FcodeTrainC.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AssignmentController {
    @Autowired
    private AssignmentService service;
    @Autowired
    private AccountService accountService;

    @GetMapping(value = "/member/course/{courseId}/assignment")
    public Iterable<Assignment> getList(@PathVariable Integer courseId) {
        return service.getListAssInCourse(courseId);
    }

    @GetMapping(value = "/member/assignment/{id}")
    public Assignment getDetail(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping(value = "/auth/course/{courseId}/assignment")
    public ResponseEntity<Assignment> add(@PathVariable Integer courseId, @RequestBody Assignment assignment, Authentication auth) {
        assignment.setCourse(new Course(courseId));
        assignment.setCreator(accountService.findByUsername(auth.getName()));
        return new ResponseEntity<>(service.add(assignment), HttpStatus.CREATED);
    }
}
