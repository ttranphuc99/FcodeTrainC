package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course, Integer> {
    Course findFirstByName(String name);
}
