package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.service.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping(value = "/profile")
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
}
