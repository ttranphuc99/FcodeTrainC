package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
public class WorkController {
    @Autowired
    private WorkService service;

    @GetMapping(value = "/member/assignment/{assignmentId}/work_success_list_count")
    public Integer countWorkSuccess(@PathVariable(name = "assignmentId") String assignmentId) {
        return service.countWorkSuccess(assignmentId);
    }

    @GetMapping(value = "/member/assignment/{assignmentId}/work_unsuccess_list_count")
    public Integer countWorkUnsuccess(@PathVariable(name = "assignmentId") String assignmentId) {
        return service.countWorkUnsuccess(assignmentId);
    }

    @PostMapping(value = "/member/uploadFile")
    public ResponseEntity uploadFile(@RequestParam("file") MultipartFile file) {
        String filename = service.storeFile(file);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/member/downloadFile/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename, HttpServletRequest request) {
        Resource resource = service.loadFileAsResource(filename);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
