package com.fcode.FcodeTrainC.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "fc_course")
public class Course {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "co_id", nullable = false)
    private Integer id;

    @Column(name = "co_name", unique = true)
    private String name;

    @Column(name = "co_description")
    private String description;

    @Column(name = "co_status")
    private Integer status;

    @Column(name = "co_created_time")
    private Timestamp createdTime;

    @Column(name = "co_last_modified")
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
    @JoinColumn(name = "ac_modified_id")
    @JsonIgnore
    private Account modifier;

    @Transient
    private String modifierName;
    @Transient
    private String modifierUsername;

    public Course() {
    }

    public Course(Integer id) {
        this.id = id;
    }

    public Course(Integer id, String name, String description, Integer status, Timestamp createdTime, Timestamp lastModified, Account creator, Account modifier) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.createdTime = createdTime;
        this.lastModified = lastModified;
        this.creator = creator;
        this.modifier = modifier;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public Account getModifier() {
        return modifier;
    }

    public void setModifier(Account modifier) {
        this.modifier = modifier;
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
