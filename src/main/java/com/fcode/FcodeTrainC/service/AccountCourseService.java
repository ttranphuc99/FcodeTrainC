package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.embeddable.AccountCourseIdentity;
import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import com.fcode.FcodeTrainC.repository.AccountCourseRepository;
import com.fcode.FcodeTrainC.repository.AccountRepository;
import com.fcode.FcodeTrainC.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class AccountCourseService {
    @Autowired
    private AccountCourseRepository repository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CourseRepository courseRepository;

    public AccountCourse save(AccountCourse accountCourse) {
        return repository.save(accountCourse);
    }

    public Collection<AccountCourse> getListAccountInCourse(Integer courseId) {
        return repository.findByIdCourseId(courseId);
    }

    public List<AccountCourse> getListCourseOfAnAccount(String username) {
        return repository.findByIdAccountUsername(username);
    }

    public List<Account> availableAccountToCourse(String username, Integer courseId) {
        return repository.availableAccountToCourse(username, courseId);
    }

    public AccountCourse addNew(Integer courseId, String username, Account creator) {
        AccountCourse accountCourse = new AccountCourse();

        accountCourse.setId(
                new AccountCourseIdentity(accountRepository.findFirstByUsername(username),
                        courseRepository.findById(courseId).get()));
        accountCourse.setCreator(creator);
        return this.save(accountCourse);
    }

    public List<AccountCourse> findByIdCourseIdAndAccountIdAndStatus(Integer courseId, Integer accountId, Integer status) {
        return repository.findByIdCourseIdAndIdAccountIdAndStatus(courseId, accountId, status);
    }
}
