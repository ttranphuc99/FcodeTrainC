package com.fcode.FcodeTrainC.controller;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class AuthenticationController {
    @Autowired
    private AccountService accountService;

    @PostMapping(path = "/login")
    public String authenticate(HttpServletRequest request) {
        return "Login success";
    }

    @GetMapping(path = "/login_success")
    public ResponseEntity loginSuccess(HttpServletRequest request) {
        String username = request.getParameter("username");
        Account acc = accountService.findByUsername(username);
        ResponseEntity en = new ResponseEntity(acc, HttpStatus.OK);
        return new ResponseEntity(acc, HttpStatus.OK);
    }

    @RequestMapping(path = "/logout")
    public String logout() {
        return "Logout successfully";
    }

    @PostMapping(path = "/member/password")
    public ResponseEntity checkPassword(HttpServletRequest request, Authentication authentication) {
        Account account = accountService.findByUsername(authentication.getName());
        String password = request.getParameter("oldPassword");
        if (password != null) {
            if (BCrypt.checkpw(password, account.getPassword())) {
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping(path = "/member/changePassword")
    public ResponseEntity changePassword(HttpServletRequest request, Authentication authentication) {
        Account account = accountService.findByUsername(authentication.getName());
        String oldPassword = request.getParameter("oldPassword");
        String newPassword = request.getParameter("newPassword");

        if (oldPassword != null) {
            if (BCrypt.checkpw(oldPassword, account.getPassword())) {
                if (newPassword != null && newPassword.length() >= 6 && newPassword.length() <= 20) {
                    String hashPass = BCrypt.hashpw(newPassword, BCrypt.gensalt());
                    account.setPassword(hashPass);

                    accountService.save(account);

                    return ResponseEntity.ok().build();
                }
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping(value = "/admin/resetPassword")
    public ResponseEntity resetPassword(HttpServletRequest request) {
        ResponseEntity response = null;
        String username = request.getParameter("username");
        Account account = accountService.findByUsername(username);

        if (account != null) {
            String hashPass = BCrypt.hashpw(username, BCrypt.gensalt());
            account.setPassword(hashPass);
            accountService.save(account);

            response = ResponseEntity.ok().build();
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }
}
