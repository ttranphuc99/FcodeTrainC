package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Account;

import java.util.List;

public interface AccountService {
    Iterable<Account> findAll();

    List<Account> searchLikeFullname(String term);

    Account findById(Integer id);

    Account findByUsername(String username);

    void save(Account account);

    void disable(Integer id);

    void delete(Integer id);

    Account updateProfile(String username, Account newAcc);
}
