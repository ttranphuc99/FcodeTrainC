package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.embeddable.AccountCourseIdentity;
import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.List;

public interface AccountCourseRepository extends CrudRepository<AccountCourse, AccountCourseIdentity> {
    Collection<AccountCourse> findByIdCourseId(Integer courseId);

    @Query("SELECT a FROM Account a " +
            "WHERE a.username LIKE %?1% " +
            "AND a.status = 1 " +
            "AND a.role.id = 2 " +
            "AND a NOT IN (" +
                "SELECT a.id.account " +
                "FROM AccountCourse a " +
                "WHERE a.id.course.id != ?2" +
            ")"
    )
    List<Account> availableAccountToCourse(String username, Integer courseId);
}
