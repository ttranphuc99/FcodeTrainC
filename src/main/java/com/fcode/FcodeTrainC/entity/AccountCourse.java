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

    @Transient
    private String creatorUsername;
    @Transient
    private String creatorFullname;

    @ManyToOne
    @JoinColumn(name = "ac_modifier_id")
    private Account modifier;

    @Transient
    private String modifierUsername;
    @Transient
    private String modifierFullname;

    @Column(name = "ac_co_created_time")
    private Timestamp createdTime;

    @Column(name = "ac_co_last_modified")
    private Timestamp lastModified;

    public AccountCourse() {
    }

    public AccountCourse(AccountCourseIdentity id, Integer status, Account creator, Account modifier, Timestamp createdTime, Timestamp lastModified) {
        this.id = id;
        this.status = status;
        this.creator = creator;
        this.modifier = modifier;
        this.createdTime = createdTime;
        this.lastModified = lastModified;
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

    public String getCreatorUsername() {
        if (this.creator != null) {
            return this.creator.getUsername();
        }
        return null;
    }

    public String getCreatorFullname() {
        if (this.creator != null) {
            return this.creator.getFullname();
        }
        return null;
    }

    public String getModifierUsername() {
        if (this.modifier != null) {
            return this.modifier.getUsername();
        }
        return null;
    }

    public String getModifierFullname() {
        if (this.modifier != null) {
            return this.modifier.getFullname();
        }
        return null;
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
