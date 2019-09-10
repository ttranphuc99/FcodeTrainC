package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Role;
import com.fcode.FcodeTrainC.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {
    @Autowired
    RoleRepository repository;

    public Role findById(int id) {
        Optional<Role> opt = this.repository.findById(id);
        return opt.isPresent() ? opt.get() : null;
    }

    public Role findByName(String name) {
        return repository.findFirstByName(name);
    }
}
