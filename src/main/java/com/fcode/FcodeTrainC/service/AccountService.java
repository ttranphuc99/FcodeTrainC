package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.UniversityCourse;
import com.fcode.FcodeTrainC.repository.AccountCourseRepository;
import com.fcode.FcodeTrainC.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AccountCourseRepository accountCourseRepository;

    public Iterable<Account> findAll() {
        return accountRepository.findAll();
    }

    public List<Account> searchLikeFullname(String term) {
        return accountRepository.findByFullnameContaining(term);
    }

    public Account findByUsername(String username) {
        return accountRepository.findFirstByUsername(username);
    }

    public Account findById(Integer id) {
        Optional<Account> opt = accountRepository.findById(id);
        return opt.isPresent() ? opt.get() : null;
    }

    public void save(Account account) {
        accountRepository.save(account);
    }

    public void disable(Integer id) {
        Account account = this.findById(id);
        account.setStatus(0);
        this.save(account);
    }

    public void delete(Integer id) {
        accountRepository.deleteById(id);
    }

    public Account updateProfile(String username, Account newAcc) {
        accountRepository.updateAccountProfile(newAcc.getFullname(), newAcc.getDescription(), username);
        return accountRepository.findFirstByUsername(username);
    }

    public Integer countAccByUniCourse(Integer id) {
        return accountRepository.countAccByUniCourse(id).size();
    }

    public List<Account> getAllByRole(int roleId) {
        return accountRepository.findByRoleId(roleId);
    }

    public void register(Account account) {
        account.setPassword(passwordEncoder.encode(account.getUsername()));
        accountRepository.save(account);
    }

    public boolean banAccount(String username) {
        if (accountRepository.banAccount(username) > 0) {
            return accountCourseRepository.banAccount(accountRepository.findFirstByUsername(username).getId()) > 0;
        }
        return false;
    }

    public boolean activeAccount(String username) {
        return accountRepository.activeAccount(username) > 0;
    }
}
