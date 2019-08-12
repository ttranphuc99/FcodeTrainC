package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Iterable<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public List<Account> searchLikeFullname(String term) {
        return accountRepository.findByFullnameContaining(term);
    }

    @Override
    public Account findByUsername(String username) {
        return accountRepository.findFirstByUsername(username);
    }

    @Override
    public Account findById(Integer id) {
        return accountRepository.findById(id).get();
    }

    @Override
    public void save(Account account) {
        accountRepository.save(account);
    }

    @Override
    public void disable(Integer id) {
        Account account = this.findById(id);
        account.setStatus(0);
        this.save(account);
    }

    @Override
    public void delete(Integer id) {
        accountRepository.deleteById(id);
    }
}
