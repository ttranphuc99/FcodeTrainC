package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.embeddable.AccountCourseIdentity;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import org.springframework.data.repository.CrudRepository;

public interface AccountCourseReporsitory extends CrudRepository<AccountCourse, AccountCourseIdentity> {
}
