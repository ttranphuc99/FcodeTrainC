package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.UniversityCourse;
import com.fcode.FcodeTrainC.repository.UniversityCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UniversityCourseService {
    @Autowired
    private UniversityCourseRepository repository;

    public void save(UniversityCourse course) {
        this.repository.save(course);
    }

    public Iterable<UniversityCourse> findAll() {
        return this.repository.findAll();
    }

    public void delete(Integer id) {
        this.repository.deleteById(id);
    }

    public UniversityCourse findById(Integer id) {
        Optional<UniversityCourse> opt = this.repository.findById(id);
        return opt.isPresent() ? opt.get() : null;
    }

    public UniversityCourse findByName(String name) {
        return repository.findByName(name);
    }
}
