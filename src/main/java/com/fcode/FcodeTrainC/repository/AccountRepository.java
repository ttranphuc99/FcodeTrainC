package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {
    List<Account> findByFullnameContaining(String term);
    Account findFirstByUsername(String term);
}
