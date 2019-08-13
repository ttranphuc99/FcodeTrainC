package com.fcode.FcodeTrainC.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    @GetMapping(path = "/login")
    public String authenticate() {
        return "Successful Authentication";
    }

    @RequestMapping(path = "/logout")
    public String logout() {
        return "Logout successfully";
    }
}
