package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Assignment;
import com.fcode.FcodeTrainC.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository repository;

    public Iterable<Assignment> getListAssInCourse(Integer courseId) {
        return repository.findByCourseId(courseId);
    }

    public Assignment findById(String id) {
        Optional<Assignment> opt = repository.findById(id);
        if (opt.isPresent()) return opt.get();
        return null;
    }
}
