package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.embeddable.AccountCourseIdentity;
import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Repository
public interface AccountCourseRepository extends CrudRepository<AccountCourse, AccountCourseIdentity> {
    Collection<AccountCourse> findByIdCourseId(Integer courseId);
    List<AccountCourse> findByIdAccountUsername(String username);

    @Query("SELECT a FROM Account a " +
            "WHERE a.username LIKE %?1% " +
            "AND a.status = 1 " +
            "AND a.role.id = 2 " +
            "AND a NOT IN (" +
                "SELECT a.id.account " +
                "FROM AccountCourse a " +
                "WHERE a.id.course.id = ?2" +
            ")"
    )
    List<Account> availableAccountToCourse(String username, Integer courseId);

    List<AccountCourse> findByIdCourseIdAndIdAccountIdAndStatus(Integer courseId, Integer accountId, Integer status);

    AccountCourse findFirstByIdCourseIdAndIdAccountUsername(Integer courseId, String username);

    List<AccountCourse> findByIdCourseIdOrderByTotalMarkDesc(Integer courseId);

    @Modifying
    @Transactional
    @Query("UPDATE AccountCourse a SET a.status = 0 WHERE (a.id.account.id = ?1)")
    int banAccount(Integer accountId);

    @Modifying
    @Transactional
    @Query("UPDATE AccountCourse a SET a.status = 1, a.modifier.id = ?3 WHERE (a.id.account.id = ?1 AND a.id.course.id = ?2)")
    int activeAccountCourse(Integer accountId, Integer courseId, Integer modiferId);

    @Modifying
    @Transactional
    @Query("UPDATE AccountCourse a SET a.status = 0, a.modifier.id = ?3 WHERE (a.id.account.id = ?1 AND a.id.course.id = ?2)")
    int banAccountCourse(Integer accountId, Integer courseId, Integer modiferId);
}
