package com.fcode.FcodeTrainC.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "fc_work")
public class Work {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "wo_id", nullable = false)
    private String id;

    @ManyToOne
    @JoinColumn(name = "as_id")
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "ac_worker")
    private Account worker;

    @ManyToOne
    @JoinColumn(name = "ac_judger")
    private Account judger;

    @Column(name = "wo_name", unique = true)
    private String name;

    @Column(name = "wo_submit_quantity")
    private Integer submitQuantity;

    @Column(name = "wo_comment")
    private String comment;

    @Column(name = "wo_status")
    private Integer status;

    @Column(name = "wo_submit_time")
    private Timestamp submitTime;

    @Column(name = "wo_judge_time")
    private Timestamp judgeTime;

    public Work() {
    }

    public Work(String id, Assignment assignment, Account worker, Account judger, String name, Integer submitQuantity, String comment, Integer status, Timestamp submitTime, Timestamp judgeTime) {
        this.id = id;
        this.assignment = assignment;
        this.worker = worker;
        this.judger = judger;
        this.name = name;
        this.submitQuantity = submitQuantity;
        this.comment = comment;
        this.status = status;
        this.submitTime = submitTime;
        this.judgeTime = judgeTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public Account getWorker() {
        return worker;
    }

    public void setWorker(Account worker) {
        this.worker = worker;
    }

    public Account getJudger() {
        return judger;
    }

    public void setJudger(Account judger) {
        this.judger = judger;
    }

    public Integer getSubmitQuantity() {
        return submitQuantity;
    }

    public void setSubmitQuantity(Integer submitQuantity) {
        this.submitQuantity = submitQuantity;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Timestamp getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Timestamp submitTime) {
        this.submitTime = submitTime;
    }

    public Timestamp getJudgeTime() {
        return judgeTime;
    }

    public void setJudgeTime(Timestamp judgeTime) {
        this.judgeTime = judgeTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
