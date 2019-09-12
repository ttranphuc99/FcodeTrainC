package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.embeddable.AccountCourseIdentity;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

public interface AccountCourseRepository extends CrudRepository<AccountCourse, AccountCourseIdentity> {
    Collection<AccountCourse> findByIdCourseId(Integer courseId);
}
