package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.*;
import com.fcode.FcodeTrainC.service.AccountCourseService;
import com.fcode.FcodeTrainC.service.AccountService;
import com.fcode.FcodeTrainC.service.AssignmentService;
import com.fcode.FcodeTrainC.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
public class WorkController {
    @Autowired
    private WorkService service;
    @Autowired
    private AssignmentService assignmentService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountCourseService accountCourseService;

    @GetMapping(value = "/member/assignment/{assignmentId}/work_success_list_count")
    public Integer countWorkSuccess(@PathVariable(name = "assignmentId") String assignmentId) {
        return service.countWorkSuccess(assignmentId);
    }

    @GetMapping(value = "/member/assignment/{assignmentId}/work_unsuccess_list_count")
    public Integer countWorkUnsuccess(@PathVariable(name = "assignmentId") String assignmentId) {
        return service.countWorkUnsuccess(assignmentId);
    }

    @GetMapping(value = "/member/assignment/{assignmentId}/work_submit_count")
    public Integer countWorkSubmited(@PathVariable(name = "assignmentId") String assignmentId, Authentication authentication) {
        return service.getLastSubmitQuanity(assignmentId, authentication.getName());
    }

    @PostMapping(value = "/member/assignment/{assignmentId}/work/")
    public ResponseEntity insertWork(@PathVariable(name = "assignmentId") String assignmentId,
                                     @RequestParam("file") MultipartFile file,
                                     Authentication authentication) {
        ResponseEntity respone = null;
        Assignment assignment = assignmentService.findById(assignmentId);

        if (assignment != null) {
            Account account = accountService.findByUsername(authentication.getName());
            Course course = assignment.getCourse();

            List<AccountCourse> list = accountCourseService.findByIdCourseIdAndAccountIdAndStatus(course.getId(), account.getId(), 1);
            if (list.isEmpty()) {
                return ResponseEntity.status(403).build();
            }

            Work work = new Work();

            String id = authentication.getName() + "_" + assignmentId;
            Integer submitQuantity = service.getLastSubmitQuanity(assignmentId, authentication.getName());
            if (submitQuantity < assignment.getSubmitQuantity()) {
                submitQuantity++;
                id += "_" + submitQuantity;

                work.setAssignment(assignment);
                work.setId(id);
                work.setSubmitQuantity(submitQuantity);
                work.setWorker(account);
                String filename = service.storeFile(file, id);
                work.setName(filename);

                service.insert(work);

                respone = ResponseEntity.ok().build();
            } else {
                respone = ResponseEntity.badRequest().body("Maximum submission quantity");
            }
        } else {
            respone = ResponseEntity.badRequest().body("Not found Assignment");
        }

        return respone;
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

    @GetMapping(value = "/member/{courseId}/work")
    public ResponseEntity getListWork(@PathVariable(name = "courseId") Integer courseId, Authentication authentication) {
        ResponseEntity response = null;
        List<Work> list = service.getListWorkByCourseAndUsername(courseId, authentication.getName());
        if (list != null) {
            response = new ResponseEntity(list, HttpStatus.OK);
        } else {
            response = ResponseEntity.noContent().build();
        }

        return response;
    }

    @GetMapping(value = "/member/work/{workId}")
    public ResponseEntity getWorkDetail(@PathVariable(name = "workId") String workId, Authentication authentication) {
        ResponseEntity response = null;
        Work work = service.getWork(workId);
        if (work != null) {
            if (work.getWorker().getUsername().equals(authentication.getName())) {
                response = new ResponseEntity(work, HttpStatus.OK);
            } else {
                response = ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } else {
            response = ResponseEntity.badRequest().build();
        }

        return response;
    }

    @GetMapping(value = "/member/work/{workId}/content")
    public String getWorkContent(@PathVariable(name = "workId") String wordId, Authentication authentication) {
        return service.getWorkContent(wordId);
    }
}
