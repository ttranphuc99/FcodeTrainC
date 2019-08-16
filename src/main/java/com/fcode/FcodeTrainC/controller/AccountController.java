package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.service.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    @Autowired
    AccountServiceImpl accountService;

    @GetMapping(value = "/profile")
    public Account getAccount(Authentication authentication) {
        Account account = accountService.findByUsername(authentication.getName());
        if (account == null) {
            ResponseEntity.notFound().build();
        }
        return account;
    }
}
