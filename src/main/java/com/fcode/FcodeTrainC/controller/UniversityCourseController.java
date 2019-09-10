package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.UniversityCourse;
import com.fcode.FcodeTrainC.service.AccountService;
import com.fcode.FcodeTrainC.service.UniversityCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class UniversityCourseController {
    @Autowired
    private UniversityCourseService service;
    @Autowired
    private AccountService account;

    @PostMapping(value = "/auth/universityCourse")
    public ResponseEntity<UniversityCourse> insert(@RequestBody UniversityCourse universityCourse, Authentication auth) {
        universityCourse.setName(universityCourse.getName().toUpperCase());
        boolean isValid = true;
        String regex = "^[a-zA-Z0-9]+$";

        if (universityCourse.getName().length() > 10 || !universityCourse.getName().matches(regex)) {
            isValid = false;
        }

        if (isValid) {
            universityCourse.setCreator(account.findByUsername(auth.getName()));
            service.save(universityCourse);
            return new ResponseEntity<>(universityCourse, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(universityCourse, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/auth/universityCourse")
    public Iterable<UniversityCourse> getAll() {
        return service.findAll();
    }

    @PutMapping(value = "/auth/universityCourse/{id}")
    public ResponseEntity<UniversityCourse> update(@RequestBody UniversityCourse universityCourse, @PathVariable Integer id, Authentication auth) {
        boolean isValid = true;
        String regex = "^[a-zA-Z0-9]+$";

        if (universityCourse.getName().length() > 10 || !universityCourse.getName().matches(regex)) {
            isValid = false;
        }

        if (isValid) {
            UniversityCourse updateCourse = this.service.findById(id);
            updateCourse.setModifier(account.findByUsername(auth.getName()));
            updateCourse.setName(universityCourse.getName());

            service.save(updateCourse);
            updateCourse = this.service.findById(id);
            return new ResponseEntity<>(updateCourse, HttpStatus.OK);
        }

        return new ResponseEntity<>(universityCourse, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping(value = "/admin/universityCourse/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    @GetMapping(value = "/auth/universityCourse/{id}")
    public ResponseEntity<UniversityCourse> findById(@PathVariable Integer id) {
        UniversityCourse result = this.service.findById(id);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping(value = "/auth/universityCourseName/{name}")
    public ResponseEntity<UniversityCourse> findByName(@PathVariable String name) {
        name = name.toUpperCase();
        UniversityCourse course = service.findByName(name);

        if (course == null) {
            return ResponseEntity.notFound().build();
        }

        return new ResponseEntity<>(course, HttpStatus.OK);
    }
}
