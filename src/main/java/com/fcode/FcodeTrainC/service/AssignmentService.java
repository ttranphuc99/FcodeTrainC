package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.Assignment;
import com.fcode.FcodeTrainC.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Assignment add(Assignment assignment) {
        assignment.setId(this.generateId(assignment.getCourse().getId()));
        return repository.save(assignment);
    }

    private String generateId(Integer courseId) {
        List<Assignment> list = repository.findByIdStartingWithOrderByCreatedTimeDesc("CO-" + courseId + "_");
        if (list.isEmpty()) return "CO-" +courseId+ "_AS-1";

        String lastId = list.get(0).getId();
        String[] idPart = lastId.split("_");
        int seqNum = Integer.parseInt(idPart[1].split("-")[1]);
        seqNum++;

        return idPart[0] + "_AS-" + seqNum;
    }

    public Assignment save(Assignment assignment) {
        return repository.save(assignment);
    }

    public boolean deleteByStatus(String assignmentId, Account modifier) {
        return repository.closeAssignment(modifier, assignmentId) > 0;
    }

    public boolean deletePermently(String assignmentId) {
        try {
            repository.deleteById(assignmentId);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public boolean active(String assignmentId, Account modifier) {
        return repository.activeAssignment(modifier, assignmentId) > 0;
    }
}
