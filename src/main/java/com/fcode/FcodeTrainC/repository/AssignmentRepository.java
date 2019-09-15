package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Assignment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AssignmentRepository extends CrudRepository<Assignment, String> {
    Iterable<Assignment> findByCourseId(Integer courseId);
    List<Assignment> findByIdStartingWithOrderByCreatedTimeDesc(String id);
}
