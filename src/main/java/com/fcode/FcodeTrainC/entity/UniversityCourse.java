package com.fcode.FcodeTrainC.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "fc_university_course")
public class UniversityCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uc_id", nullable = false)
    private Integer id;

    @Column(name = "uc_name", unique = true)
    private String name;

    @Column(name = "uc_date_created")
    private Timestamp dateCreated;

    @Column(name = "uc_last_modified")
    private Timestamp lastModified;

    @ManyToOne
    @JoinColumn(name = "ac_creator_id")
    @JsonIgnore
    private Account creator;

    @ManyToOne
    @JoinColumn(name = "ac_modified_id")
    @JsonIgnore
    private Account modifier;

    @Transient
    private String creatorName;
    @Transient
    private String creatorUsername;

    @Transient
    private String modifierName;
    @Transient
    private String modifierUsername;

    public UniversityCourse() {
    }

    public UniversityCourse(Integer id) {
        this.id = id;
    }

    public UniversityCourse(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public UniversityCourse(Integer id, String name, Timestamp dateCreated, Timestamp lastModified, Account creator) {
        this.id = id;
        this.name = name;
        this.dateCreated = dateCreated;
        this.lastModified = lastModified;
        this.creator = creator;
    }

    public String getCreatorName() {
        return (creator != null) ? this.getCreator().getFullname() : null;
    }

    public String getCreatorUsername() {
        return (creator != null) ? this.getCreator().getUsername() : null;
    }

    public String getModifierName() {
        if (this.getModifier() != null) {
            return this.getModifier().getFullname();
        }
        return "";
    }

    public String getModifierUsername() {
        if (this.getModifier() != null) {
            return this.getModifier().getUsername();
        }
        return "";
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

    public Account getModifier() {
        return modifier;
    }

    public void setModifier(Account modifier) {
        this.modifier = modifier;
    }
}
