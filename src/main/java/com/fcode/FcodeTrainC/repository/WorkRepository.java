package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Work;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface WorkRepository extends CrudRepository<Work,String> {
    @Query("SELECT count(w.worker) FROM Work w WHERE w.assignment.id = ?1 AND w.status = 1")
    Integer countSuccessWorkByAss(String assId);

    @Query("SELECT count(w.worker) FROM Work w WHERE w.assignment.id = ?1 AND w.status != 1")
    Integer countUnsuccessWorkByAss(String assId);
}
