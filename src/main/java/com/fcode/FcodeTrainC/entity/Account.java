package com.fcode.FcodeTrainC.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Table(name = "fc_account")
public class Account {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ac_id", nullable = false)
    private Integer id;

    @Column(name = "ac_username", unique = true)
    private String username;

    @Column(name = "ac_password")
    @JsonIgnore
    private String password;

    @Column(name = "ac_fullname")
    private String fullname;

    @Column(name = "ac_description")
    private String description;

    @Column(name = "ac_status")
    private Integer status;

    @Column(name = "ac_date_created")
    private Timestamp dateCreated;

    @Column(name = "ac_last_modified")
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
    @JoinColumn(name = "ro_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "uc_id")
    private UniversityCourse universityCourse;

    public Account() {
    }

    public Account(Integer id) {
        this.id = id;
    }

    public Account(String username, String password, String fullname, String description, Integer status, Role role, UniversityCourse universityCourse) {
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.description = description;
        this.status = status;
        this.role = role;
        this.universityCourse = universityCourse;
    }

    public Account(Integer id, String username, String password, String fullname, String description, Integer status, Timestamp dateCreated, Timestamp lastModified, Account creator, Role role, UniversityCourse universityCourse) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.description = description;
        this.status = status;
        this.dateCreated = dateCreated;
        this.lastModified = lastModified;
        this.creator = creator;
        this.role = role;
        this.universityCourse = universityCourse;
    }

    public String getCreatorName() {
        return (creator != null) ? creator.getFullname() : null;
    }

    public String getCreatorUsername() {
        return (creator != null) ? creator.getUsername() : null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
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

    public Timestamp getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Timestamp dateCreated) {
        this.dateCreated = dateCreated;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UniversityCourse getUniversityCourse() {
        return universityCourse;
    }

    public void setUniversityCourse(UniversityCourse universityCourse) {
        this.universityCourse = universityCourse;
    }
}
