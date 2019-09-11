package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Course;
import com.fcode.FcodeTrainC.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository repository;

    public Iterable<Course> findAll() {
        return repository.findAll();
    }

    public Course findById(Integer id) {
        Optional<Course> opt = repository.findById(id);
        return opt.isPresent() ? opt.get() : null;
    }

    public Course findByName(String name) {
        return repository.findFirstByName(name);
    }

    public void save(Course course) {
        repository.save(course);
    }
}
