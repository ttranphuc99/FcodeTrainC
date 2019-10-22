package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.embeddable.AccountCourseIdentity;
import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.AccountCourse;
import com.fcode.FcodeTrainC.entity.Assignment;
import com.fcode.FcodeTrainC.entity.Work;
import com.fcode.FcodeTrainC.repository.AccountCourseRepository;
import com.fcode.FcodeTrainC.repository.AccountRepository;
import com.fcode.FcodeTrainC.repository.CourseRepository;
import com.fcode.FcodeTrainC.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AccountCourseService {
    @Autowired
    private AccountCourseRepository repository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private WorkRepository workRepository;

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
        accountCourse.setTotalMark(0);
        return this.save(accountCourse);
    }

    public List<AccountCourse> findByIdCourseIdAndAccountIdAndStatus(Integer courseId, Integer accountId, Integer status) {
        return repository.findByIdCourseIdAndIdAccountIdAndStatus(courseId, accountId, status);
    }

    public void calTotalMark(Account worker, Integer courseId) {
        List<Work> listWork = workRepository.getListWorkByCourseAndUsernameTimeAscAndNotWaiting(courseId, worker.getUsername());

        if (listWork != null) {
            //key is assignment Id
            Map<String, Work> map = new HashMap<>();
            for (Work work : listWork) {
                map.put(work.getAssignment().getId(), work);
            }

            int total = 0;

            Iterator<String> it = map.keySet().iterator();
            Work currentWork = null;
            while (it.hasNext()) {
                currentWork = map.get(it.next());
                if (currentWork.getStatus() == 1) {
                    total += currentWork.getAssignment().getMark();
                }
            }

            AccountCourse accountCourse = repository.findByIdCourseIdAndIdAccountIdAndStatus(courseId, worker.getId(), 1).get(0);
            accountCourse.setTotalMark(total);

            repository.save(accountCourse);
        }
    }

    public List<AccountCourse> getChart(Integer courseId) {
        return repository.findByIdCourseIdOrderByTotalMarkDesc(courseId);
    }

    public boolean activeAccountCourse(Integer accountId, Integer courseId, Integer modiferId) {
        return repository.activeAccountCourse(accountId, courseId, modiferId) > 0;
    }

    public boolean banAccountCourse(Integer accountId, Integer courseId, Integer modiferId) {
        return repository.banAccountCourse(accountId, courseId, modiferId) > 0;
    }

    public boolean delete(String username, Integer courseId) {
        AccountCourse accountCourse = repository.findFirstByIdCourseIdAndIdAccountUsername(courseId, username);

        if (accountCourse != null) {
            repository.delete(accountCourse);
            return true;
        }

        return false;
    }
}
