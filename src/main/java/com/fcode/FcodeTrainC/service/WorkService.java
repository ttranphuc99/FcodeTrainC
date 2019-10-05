package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Work;
import com.fcode.FcodeTrainC.file.FileStorageProperty;
import com.fcode.FcodeTrainC.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class WorkService {
    @Autowired
    private WorkRepository repository;

    public Integer countWorkSuccess(String assignmentId) {
        return repository.countSuccessWorkByAss(assignmentId);
    }

    public Integer countWorkUnsuccess(String assignmentId) {
        return repository.countUnsuccessWorkByAss(assignmentId);
    }

    public Work insert(Work work) {
        return repository.save(work);
    }

    public Integer getLastSubmitQuanity(String assignmentId, String username) {
        Work work = repository.findFirstByAssignmentIdAndWorkerUsernameOrderBySubmitTimeDesc(assignmentId, username);

        if (work != null) {
            return work.getSubmitQuantity();
        }
        return 0;
    }

    private final Path fileStorageLocation;

    @Autowired
    public WorkService(FileStorageProperty fileStorageProperty) {
        this.fileStorageLocation = Paths.get(fileStorageProperty.getUploadDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String storeFile(MultipartFile file, String filename) {
        //normalize file name
        String originName = StringUtils.cleanPath(file.getOriginalFilename());
        String extendsion = originName.substring(originName.lastIndexOf("."));
        filename += extendsion;
        try {
            Path targetLocation = this.fileStorageLocation.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return filename;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public Resource loadFileAsResource(String filename) {
        try {
            Path filePath = this.fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return resource;
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

}
