package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkService {
    @Autowired
    private WorkRepository repository;

    public Integer countWorkSuccess(String assignmentId) {
        return repository.countSuccessWorkByAss(assignmentId);
    }

    public Integer countWorkUnsuccess(String assignmentId) {
        return repository.countUnsuccessWorkByAss(assignmentId);
    }
}
