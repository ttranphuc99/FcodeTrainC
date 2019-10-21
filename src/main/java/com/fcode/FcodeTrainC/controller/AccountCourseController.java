package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import com.fcode.FcodeTrainC.service.AccountCourseService;
import com.fcode.FcodeTrainC.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @GetMapping(value = "/member/chart/{courseId}")
    public ResponseEntity getChart(Authentication authentication, @PathVariable(name = "courseId") Integer courseId) {
        ResponseEntity response = null;

        Account account = accountService.findByUsername(authentication.getName());
        if (!service.findByIdCourseIdAndAccountIdAndStatus(courseId,
                account.getId(), 1).isEmpty() || account.getRole().getId() != 2) {
            List<AccountCourse> list = service.getChart(courseId);
            response = new ResponseEntity(list, HttpStatus.OK);
        } else {
            response = ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return response;
    }

    @PutMapping(value = "/auth/account_course/change_status")
    public ResponseEntity changeStatus(HttpServletRequest request, Authentication authentication) {
        ResponseEntity response = null;
        String username = request.getParameter("username");
        Integer accountId = accountService.findByUsername(username) != null ? accountService.findByUsername(username).getId() : 0;
        Integer modifierId = accountService.findByUsername(authentication.getName()).getId();
        Integer courseId = Integer.parseInt(request.getParameter("courseId"));
        Integer status = Integer.parseInt(request.getParameter("status"));

        List<AccountCourse> list = service.findByIdCourseIdAndAccountIdAndStatus(courseId, accountId, status == 1 ? 0 : 1);

        if (list.isEmpty()) {
            response = ResponseEntity.badRequest().build();
        } else {
            AccountCourse accountCourse = list.get(0);

            if (status == 1) {
                if (accountCourse.getId().getAccount().getStatus() == 1) {
                    if (service.activeAccountCourse(accountId, courseId, modifierId)) {
                        response = ResponseEntity.ok().build();
                    } else {
                        response = ResponseEntity.badRequest().build();
                    }
                } else {
                    response = ResponseEntity.badRequest().build();
                }
            } else {
                if (service.banAccountCourse(accountId, courseId, modifierId)) {
                    response = ResponseEntity.ok().build();
                } else {
                    response = ResponseEntity.badRequest().build();
                }
            }
        }
        return response;
    }

    @DeleteMapping(value = "/auth/account_course/{username}/{courseId}")
    public ResponseEntity delete(@PathVariable(name = "username") String username, @PathVariable(name = "courseId") Integer courseId) {
        ResponseEntity response = null;
        if (service.delete(username, courseId)) {
            response = ResponseEntity.ok().build();
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }
}
