package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Assignment;
import org.springframework.data.repository.CrudRepository;

public interface AssignmentRepository extends CrudRepository<Assignment, String> {
    Iterable<Assignment> findByCourseId(Integer courseId);
}
