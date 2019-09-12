package com.fcode.FcodeTrainC.embeddable;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.Course;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class AccountCourseIdentity implements Serializable {
    @ManyToOne
    @JoinColumn(name = "ac_id", nullable = false)
    private Account account;

    @ManyToOne
    @JoinColumn(name = "co_id", nullable = false)
    private Course course;

    public AccountCourseIdentity() {
    }

    public AccountCourseIdentity(Account account, Course course) {
        this.account = account;
        this.course = course;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
