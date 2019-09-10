package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Course;
import com.fcode.FcodeTrainC.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseController {
    @Autowired
    private CourseService service;

    @GetMapping(value = "/auth/course")
    public Iterable<Course> getAll() {
        return service.findAll();
    }

    @PostMapping(value = "/auth/course")
    public ResponseEntity<Course> insert(@RequestBody Course course) {
        service.save(course);
        return ResponseEntity.ok().build();
    }
}
