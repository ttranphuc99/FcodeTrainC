package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.Assignment;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AssignmentRepository extends CrudRepository<Assignment, String> {
    Iterable<Assignment> findByCourseId(Integer courseId);
    List<Assignment> findByIdStartingWithOrderByCreatedTimeDesc(String id);

    @Modifying
    @Transactional
    @Query("UPDATE Assignment a SET a.status = 0, a.modifier = ?1 WHERE a.id = ?2")
    int closeAssignment(Account modifier, String id);

    @Modifying
    @Transactional
    @Query("UPDATE Assignment a SET a.status = 1, a.modifier = ?1 WHERE a.id = ?2")
    int activeAssignment(Account modifier, String id);
}
