package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Course;
import com.fcode.FcodeTrainC.service.AccountService;
import com.fcode.FcodeTrainC.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class CourseController {
    @Autowired
    private CourseService service;
    @Autowired
    AccountService accountService;

    @GetMapping(value = "/auth/course")
    public Iterable<Course> getAll() {
        return service.findAll();
    }

    @GetMapping(value = "/member/course/name/{name}")
    public ResponseEntity<Course> getCourseById(@PathVariable String name) {
        Course c = service.findByName(name);
        ResponseEntity<Course> result;
        if (c != null) {
            result = new ResponseEntity(c, HttpStatus.OK);
        } else {
            result = ResponseEntity.notFound().build();
        }
        return result;
    }

    @PostMapping(value = "/auth/course")
    public ResponseEntity<Course> add(@RequestBody Course course, Authentication authentication) {
        boolean isValid = true;
        String nameRegex = "^[a-zA-Z0-9._\\s]+$";

        if (course.getName().length() > 45 || course.getName().length() == 0) {
            isValid = false;
        } else if (!course.getName().matches(nameRegex)) {
            isValid = false;
        }

        if (course.getDescription().length() > 255 || course.getDescription().isEmpty()) {
            isValid = false;
        }

        if (isValid) {
            course.setCreator(accountService.findByUsername(authentication.getName()));
            service.save(course);
            return new ResponseEntity<>(course, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(course, HttpStatus.BAD_REQUEST);
    }
}
