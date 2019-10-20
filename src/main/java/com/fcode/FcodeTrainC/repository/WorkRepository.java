package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Work;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WorkRepository extends CrudRepository<Work,String> {
    @Query("SELECT count(w.worker) FROM Work w WHERE w.assignment.id = ?1 AND w.status = 1")
    Integer countSuccessWorkByAss(String assId);

    @Query("SELECT count(w.worker) FROM Work w WHERE w.assignment.id = ?1 AND w.status != 1")
    Integer countUnsuccessWorkByAss(String assId);

    Work findFirstByAssignmentIdAndWorkerUsernameOrderBySubmitTimeDesc(String assignmentId, String username);

    @Query("SELECT w FROM Work w WHERE w.assignment.course.id = ?1 AND w.worker.username = ?2 ORDER BY w.submitTime DESC")
    List<Work> getListWorkByCourseAndUsername(Integer courseId, String username);

    @Query("SELECT w FROM Work w WHERE w.assignment.course.id = ?1 AND w.worker.username = ?2 AND w.status != 0 ORDER BY w.submitTime ASC")
    List<Work> getListWorkByCourseAndUsernameTimeAscAndNotWaiting(Integer courseId, String username);

    List<Work> findByAssignmentCourseIdOrderBySubmitTimeDesc(Integer courseId);

    List<Work> findByAssignmentIdAndWorkerUsernameOrderBySubmitTimeDesc(String assignmentId, String username);
}
