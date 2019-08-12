package com.fcode.FcodeTrainC.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @GetMapping(path = "/login")
    public String authenticate() {
        System.out.println("In controller");
        return "Successful Authentication";
    }
}
