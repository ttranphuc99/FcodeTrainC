package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.UniversityCourse;

public interface UniversityCourseService {
    void save(UniversityCourse course);

    Iterable<UniversityCourse> findAll();

    void delete(Integer id);

    UniversityCourse findById(Integer id);

    UniversityCourse findByName(String name);
}
