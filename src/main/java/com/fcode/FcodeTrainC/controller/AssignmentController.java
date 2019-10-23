package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import com.fcode.FcodeTrainC.entity.Assignment;
import com.fcode.FcodeTrainC.entity.Course;
import com.fcode.FcodeTrainC.service.AccountCourseService;
import com.fcode.FcodeTrainC.service.AccountService;
import com.fcode.FcodeTrainC.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AssignmentController {
    @Autowired
    private AssignmentService service;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountCourseService accountCourseService;

    @GetMapping(value = "/member/course/{courseId}/assignment")
    public Iterable<Assignment> getList(@PathVariable Integer courseId) {
        return service.getListAssInCourse(courseId);
    }

    @GetMapping(value = "/member/assignment/{id}")
    public ResponseEntity<Assignment> getDetail(@PathVariable String id, Authentication authentication) {
        Assignment ass = service.findById(id);

        for (int i = 0; i < authentication.getAuthorities().toArray().length; i++) {
            SimpleGrantedAuthority role = (SimpleGrantedAuthority) authentication.getAuthorities().toArray()[i];

            if (role.getAuthority().equalsIgnoreCase("admin") || role.getAuthority().equalsIgnoreCase("mentor")) {
                return new ResponseEntity<>(ass, HttpStatus.OK);
            }
        }

        Account account = accountService.findByUsername(authentication.getName());
        Course course = ass.getCourse();

        List<AccountCourse> list = accountCourseService.findByIdCourseIdAndAccountIdAndStatus(course.getId(), account.getId(), 1);
        if (list.isEmpty()) {
            return ResponseEntity.status(403).build();
        }
        return new ResponseEntity<>(ass, HttpStatus.OK);
    }

    @PostMapping(value = "/auth/course/{courseId}/assignment")
    public ResponseEntity<Assignment> add(@PathVariable Integer courseId, @RequestBody Assignment assignment, Authentication auth) {
        assignment.setCourse(new Course(courseId));
        assignment.setCreator(accountService.findByUsername(auth.getName()));
        return new ResponseEntity<>(service.add(assignment), HttpStatus.CREATED);
    }

    @PutMapping(value = "/auth/assignment/{id}")
    public ResponseEntity<Assignment> update(@PathVariable String id, @RequestBody Assignment assignment, Authentication authentication) {
        Assignment updateAss = service.findById(id);
        updateAss.setTitle(assignment.getTitle());
        updateAss.setSubmitQuantity(assignment.getSubmitQuantity());
        updateAss.setMark(assignment.getMark());
        updateAss.setContent(assignment.getContent());
        updateAss.setStatus(assignment.getStatus());
        updateAss.setModifier(accountService.findByUsername(authentication.getName()));

        assignment = service.save(updateAss);

        return new ResponseEntity<>(assignment, HttpStatus.OK);
    }

    @DeleteMapping(value = "/auth/assignment/{id}/close")
    public ResponseEntity deleteByStatus(@PathVariable String id, Authentication authentication) {
        boolean check = service.deleteByStatus(id, accountService.findByUsername(authentication.getName()));
        if (check) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping(value = "/auth/assignment/{id}/delete")
    public ResponseEntity deletePermently(@PathVariable String id) {
        boolean check = service.deletePermently(id);
        if (check) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/auth/assignment/{id}/active")
    public ResponseEntity active(@PathVariable String id, Authentication authentication) {
        boolean check = service.active(id, accountService.findByUsername(authentication.getName()));
        if (check) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
