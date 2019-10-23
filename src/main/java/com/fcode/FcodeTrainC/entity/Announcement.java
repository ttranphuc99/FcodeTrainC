package com.fcode.FcodeTrainC.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "fc_announcement")
public class Announcement {
    private static final long serialVersionUIDLONG = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "an_id", nullable = false)
    private Long id;

    @Column(name = "an_title", nullable = false)
    private String title;

    @Column(name = "an_content")
    private String content;

    @Column(name = "an_created_time")
    private Timestamp createdTime;

    @Column(name = "an_last_modified")
    private Timestamp lastModified;

    @ManyToOne
    @JoinColumn(name = "co_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "ac_last_modifier_id")
    private Account modifer;

    @ManyToOne
    @JoinColumn(name = "ac_creator_id")
    private Account creator;

    public Announcement() {
    }

    public Announcement(String title, String content, Timestamp createdTime, Timestamp lastModified, Course course, Account modifer, Account creator) {
        this.title = title;
        this.content = content;
        this.createdTime = createdTime;
        this.lastModified = lastModified;
        this.course = course;
        this.modifer = modifer;
        this.creator = creator;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Account getModifer() {
        return modifer;
    }

    public void setModifer(Account modifer) {
        this.modifer = modifer;
    }

    public Account getCreator() {
        return creator;
    }

    public void setCreator(Account creator) {
        this.creator = creator;
    }
}
