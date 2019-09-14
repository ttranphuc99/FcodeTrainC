package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Assignment;
import com.fcode.FcodeTrainC.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AssignmentController {
    @Autowired
    private AssignmentService service;

    @GetMapping(value = "/auth/course/{courseId}/assignment")
    public Iterable<Assignment> getList(@PathVariable Integer courseId) {
        return service.getListAssInCourse(courseId);
    }

    @GetMapping(value = "/auth/assignment/{id}")
    public Assignment getDetail(@PathVariable String id) {
        return service.findById(id);
    }
}
