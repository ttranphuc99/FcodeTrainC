package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Announcement;
import com.fcode.FcodeTrainC.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {
    @Autowired
    private AnnouncementRepository repository;

    public void save(Announcement announcement) {
        repository.save(announcement);
    }

    public List<Announcement> findByCourseId(Integer courseId) {
        return repository.findByCourseIdOrderByCreatedTimeDesc(courseId);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Announcement findById(Long id) {
        Optional<Announcement> opt = repository.findById(id);
        return opt.isPresent() ? opt.get() : null;
    }

    public List<Announcement> findAll() {
        return repository.findAllByOrderByCreatedTimeDesc();
    }

    public List<Announcement> findByUsername(String username) {
        return repository.findByUsername(username);
    }
}
