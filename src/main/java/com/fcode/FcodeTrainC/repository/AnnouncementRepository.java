package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Announcement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends CrudRepository<Announcement, Long> {
    List<Announcement> findByCourseIdOrderByCreatedTime(Integer courseId);
}
