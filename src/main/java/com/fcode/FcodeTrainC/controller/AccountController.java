package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.entity.Role;
import com.fcode.FcodeTrainC.service.AccountService;
import com.fcode.FcodeTrainC.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {
    @Autowired
    AccountService accountService;
    @Autowired
    RoleService roleService;

    @GetMapping(value = "/member/account/{username}")
    public ResponseEntity getAccount(@PathVariable String username) {
        ResponseEntity response = null;
        Account account = accountService.findByUsername(username);
        if (account == null) {
            response = ResponseEntity.notFound().build();
        } else {
            response = ResponseEntity.ok(account);
        }
        return response;
    }

    @PutMapping(value = "/member/account")
    public ResponseEntity<Account> updateAccountProfile(Authentication authentication, @RequestBody Account account) {
        boolean isValid = true;
        String nameRegex = "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

        if (account.getFullname().length() > 50 || !account.getFullname().matches(nameRegex)) {
            isValid = false;
        }

        if (account.getDescription().length() > 255) {
            isValid = false;
        }

        if (isValid) {
            Account updatedAcc = accountService.updateProfile(authentication.getName(), account);
            return new ResponseEntity<>(updatedAcc, HttpStatus.OK);
        }

        return new ResponseEntity<>(accountService.findByUsername(authentication.getName()), HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/auth/account_universityCourse_quantity/{id}")
    public Integer countAccByUniCourse(@PathVariable Integer id) {
        return accountService.countAccByUniCourse(id);
    }

    @GetMapping(value = "/auth/account/{roleId}")
    public Iterable<Account> findAllByRole(@PathVariable Integer roleId) {
        return accountService.getAllByRole(roleId);
    }

    @PostMapping(value = "/auth/account/{roleId}")
    public ResponseEntity insertNewAccount(@RequestBody Account account, @PathVariable Integer roleId, Authentication authentication) {
        ResponseEntity response = null;

        if (roleId != 1) {
            Role role = roleService.findById(roleId);

            if (role != null) {
                boolean isValid = true;

                String regexUsername = "^[a-zA-Z0-9._]+$";
                String nameRegex = "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

                if (!account.getUsername().matches(regexUsername) || account.getUsername().length() > 45) {
                    isValid = false;
                }

                if (account.getFullname() != null && !account.getFullname().isEmpty()) {
                    if (!account.getFullname().matches(nameRegex) || account.getFullname().length() > 50) {
                        isValid = false;
                    }
                }

                if (account.getUniversityCourse() == null) {
                    isValid = false;
                }

                if (isValid) {
                    account.setRole(role);
                    account.setCreator(accountService.findByUsername(authentication.getName()));
                    accountService.register(account);

                    response = new ResponseEntity(accountService.findByUsername(account.getUsername()), HttpStatus.CREATED);
                } else {
                    response = ResponseEntity.badRequest().build();
                }
            } else {
                response = ResponseEntity.badRequest().build();
            }
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @GetMapping(value = "/auth/ban_account/{username}")
    public ResponseEntity banAccount(@PathVariable String username, Authentication authentication) {
        ResponseEntity response = null;
        if (username.equals(authentication.getName())) {
            response = ResponseEntity.badRequest().build();
        } else {
            Account account = accountService.findByUsername(username);
            if (account != null && account.getRole().getId() != 1) {
                accountService.banAccount(username);
                response = ResponseEntity.ok().build();
            } else {
                response = ResponseEntity.badRequest().build();
            }
        }
        return response;
    }

    @PutMapping(value = "/auth/account/{username}/{status}")
    public ResponseEntity changeStatus(@PathVariable(name = "username") String username, @PathVariable(name = "status") Integer status, Authentication authentication) {
        ResponseEntity response = null;
        if (username.equals(authentication.getName())) {
            response = ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } else {
            boolean flag = false;
            if (status == 0) {
                flag = accountService.banAccount(username);
            } else {
                flag = accountService.activeAccount(username);
            }

            if (flag) {
                response = ResponseEntity.ok().build();
            } else {
                response = ResponseEntity.badRequest().build();
            }
        }
        return response;
    }
}
