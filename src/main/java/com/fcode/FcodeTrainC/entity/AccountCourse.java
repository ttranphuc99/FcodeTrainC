package com.fcode.FcodeTrainC.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fcode.FcodeTrainC.embeddable.AccountCourseIdentity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "fc_account_course")
public class AccountCourse {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private AccountCourseIdentity id;

    @Column(name = "ac_co_status")
    private Integer status;

    @ManyToOne
    @JoinColumn(name = "ac_creator_id")
    private Account creator;

    @ManyToOne
    @JoinColumn(name = "ac_modifier_id")
    private Account modifier;

    @Column(name = "ac_co_created_time")
    private Timestamp createdTime;

    @Column(name = "ac_co_last_modified")
    private Timestamp lastModified;

    @Column(name = "ac_co_total_mark")
    private Integer totalMark;

    public AccountCourse() {
    }

    public AccountCourse(AccountCourseIdentity id, Integer status, Account creator, Account modifier, Timestamp createdTime, Timestamp lastModified, Integer totalMark) {
        this.id = id;
        this.status = status;
        this.creator = creator;
        this.modifier = modifier;
        this.createdTime = createdTime;
        this.lastModified = lastModified;
        this.totalMark = totalMark;
    }

    public Integer getTotalMark() {
        return totalMark;
    }

    public void setTotalMark(Integer totalMark) {
        this.totalMark = totalMark;
    }

    public Timestamp getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Timestamp createdTime) {
        this.createdTime = createdTime;
    }

    public Timestamp getLastModified() {
        return lastModified;
    }

    public void setLastModified(Timestamp lastModified) {
        this.lastModified = lastModified;
    }

    public AccountCourseIdentity getId() {
        return id;
    }

    public void setId(AccountCourseIdentity id) {
        this.id = id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Account getCreator() {
        return creator;
    }

    public void setCreator(Account creator) {
        this.creator = creator;
    }

    public Account getModifier() {
        return modifier;
    }

    public void setModifier(Account modifier) {
        this.modifier = modifier;
    }
}
