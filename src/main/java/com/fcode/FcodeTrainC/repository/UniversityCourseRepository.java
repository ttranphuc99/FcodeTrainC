package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.UniversityCourse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityCourseRepository extends CrudRepository<UniversityCourse, Integer> {
    UniversityCourse findByName(String name);
}
