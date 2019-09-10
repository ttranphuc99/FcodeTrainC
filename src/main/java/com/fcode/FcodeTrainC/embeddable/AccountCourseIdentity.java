package com.fcode.FcodeTrainC.embeddable;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
public class AccountCourseIdentity implements Serializable {
    @NotNull
    private Integer accountId;

    @NotNull
    private Integer courseId;

    public AccountCourseIdentity() {
    }

    public AccountCourseIdentity(@NotNull Integer accountId, @NotNull Integer courseId) {
        this.accountId = accountId;
        this.courseId = courseId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    @Override
    public int hashCode() {
        int result = accountId.hashCode();
        result = 31 * result + courseId.hashCode();
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;

        if (obj == null || obj.getClass() != this.getClass()) return false;

        AccountCourseIdentity that = (AccountCourseIdentity) obj;
        if (this.accountId != that.accountId) return false;
        return this.courseId == that.courseId;
    }
}
