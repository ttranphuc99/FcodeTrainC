package com.fcode.FcodeTrainC.entity;

import javax.persistence.*;

@Entity
@Table(name = "fc_role")
public class Role {
    @Id
    @Column(name = "ro_id", nullable = false)
    private Integer id;

    @Column(name = "ro_name")
    private String name;

    public Role() {
    }

    public Role(Integer id, String name) {
        this.id = id;
        this.name = name;
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
}
