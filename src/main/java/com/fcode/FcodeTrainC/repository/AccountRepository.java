package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Account;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {
    List<Account> findByFullnameContaining(String term);

    Account findFirstByUsername(String term);

    @Modifying
    @Transactional
    @Query("UPDATE Account a SET a.fullname = ?1, a.description = ?2 WHERE (a.username = ?3)")
    int updateAccountProfile(String fullname, String description, String username);

    @Query("SELECT a FROM Account a WHERE a.universityCourse.id = ?1")
    List<Account> countAccByUniCourse(Integer id);
}
