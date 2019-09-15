package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WorkController {
    @Autowired
    private WorkService service;

    @GetMapping(value = "/member/assignment/{assignmentId}/work_success_list_count")
    public Integer countWorkSuccess(@PathVariable(name = "assignmentId") String assignmentId) {
        return service.countWorkSuccess(assignmentId);
    }

    @GetMapping(value = "/member/assignment/{assignmentId}/work_unsuccess_list_count")
    public Integer countWorkUnsuccess(@PathVariable(name = "assignmentId") String assignmentId) {
        return service.countWorkUnsuccess(assignmentId);
    }
}
