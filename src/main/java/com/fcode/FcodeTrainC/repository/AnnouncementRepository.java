package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Announcement;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends CrudRepository<Announcement, Long> {
    List<Announcement> findByCourseIdOrderByCreatedTimeDesc(Integer courseId);

    List<Announcement> findAllByOrderByCreatedTimeDesc();

    @Query("SELECT a FROM Announcement a WHERE a.course.id IN " +
            "(SELECT ac.id.course.id FROM AccountCourse ac WHERE ac.id.account.username = ?1) " +
            "ORDER BY a.createdTime DESC")
    List<Announcement> findByUsername(String username);
}
