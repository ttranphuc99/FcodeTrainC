package com.fcode.FcodeTrainC.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "fc_assignment")
public class Assignment {
    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "co_id")
    private Course course;

    @Id
    @Column(name = "as_id", nullable = false)
    private String id;

    @Column(name = "as_title")
    private String title;

    @Column(name = "as_content")
    private String content;

    @Column(name = "as_mark")
    private Integer mark;

    @Column(name = "as_submit_quantity")
    private Integer submitQuantity;

    @Column(name = "as_status")
    private Integer status;

    @Column(name = "as_created_time")
    private Timestamp createdTime;

    @Column(name = "as_last_modified")
    private Timestamp lastModified;

    @ManyToOne
    @JoinColumn(name = "ac_creator_id")
    @JsonIgnore
    private Account creator;

    @Transient
    private String creatorName;
    @Transient
    private String creatorUsername;

    @ManyToOne
    @JoinColumn(name = "ac_modifier_id")
    @JsonIgnore
    private Account modifier;

    @Transient
    private String modifierName;
    @Transient
    private String modifierUsername;



    public Assignment() {
    }

    public Assignment(String id, String title, String content, Integer mark, Integer submitQuantity, Integer status, Timestamp createdTime, Timestamp lastModified, Account creator, Account modifier, Course course) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.mark = mark;
        this.submitQuantity = submitQuantity;
        this.status = status;
        this.createdTime = createdTime;
        this.lastModified = lastModified;
        this.creator = creator;
        this.modifier = modifier;
        this.course = course;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getMark() {
        return mark;
    }

    public void setMark(Integer mark) {
        this.mark = mark;
    }

    public Integer getSubmitQuantity() {
        return submitQuantity;
    }

    public void setSubmitQuantity(Integer submitQuantity) {
        this.submitQuantity = submitQuantity;
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

    public String getCreatorName() {
        if (this.creator != null) {
            return this.creator.getFullname();
        }
        return null;
    }

    public String getCreatorUsername() {
        if (this.creator != null) {
            return this.creator.getUsername();
        }
        return null;
    }

    public String getModifierName() {
        if (this.modifier != null) {
            return this.modifier.getFullname();
        }
        return null;
    }

    public String getModifierUsername() {
        if (this.modifier != null) {
            return this.modifier.getUsername();
        }
        return null;
    }
}
