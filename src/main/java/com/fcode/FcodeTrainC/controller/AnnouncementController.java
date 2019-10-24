package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Announcement;
import com.fcode.FcodeTrainC.service.AccountService;
import com.fcode.FcodeTrainC.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AnnouncementController {
    @Autowired
    private AnnouncementService service;
    @Autowired
    private AccountService accountService;

    @PostMapping(value = "/auth/announcement")
    public ResponseEntity addNew(@RequestBody Announcement announcement, Authentication authentication) {
        ResponseEntity response = ResponseEntity.badRequest().build();

        if (announcement != null) {
            announcement.setCreator(accountService.findByUsername(authentication.getName()));
            service.save(announcement);
            response = ResponseEntity.ok().build();
        }

        return response;
    }

    @PutMapping(value = "/auth/announcement/{id}")
    public ResponseEntity update(@PathVariable(name = "id") Long id, @RequestBody Announcement announcement, Authentication authentication) {
        ResponseEntity response = ResponseEntity.badRequest().build();

        if (announcement != null) {
            Announcement currentAnn = service.findById(id);
            if (currentAnn != null) {
                currentAnn.setTitle(announcement.getTitle());
                currentAnn.setContent(announcement.getContent());
                currentAnn.setCourse(currentAnn.getCourse());
                currentAnn.setModifier(accountService.findByUsername(authentication.getName()));

                service.save(currentAnn);

                response = ResponseEntity.ok().build();
            }
        }

        return response;
    }

    @GetMapping(value = "/member/announcement")
    public ResponseEntity getListAnnouncement(Authentication authentication) {
        ResponseEntity response = null;
        List<Announcement> list = service.findByUsername(authentication.getName());
        response = new ResponseEntity(list, HttpStatus.OK);
        return response;
    }

    @GetMapping(value = "/member/announcement/{id}")
    public ResponseEntity getAnnouncement(@PathVariable(name = "id") Long id) {
        return new ResponseEntity(service.findById(id), HttpStatus.OK);
    }

    @DeleteMapping(value = "/admin/announcement/{id}")
    public ResponseEntity delete(@PathVariable(name = "id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/auth/announcement")
    public ResponseEntity getAll() {
        List<Announcement> list = service.findAll();
        return new ResponseEntity(list, HttpStatus.OK);
    }
}
