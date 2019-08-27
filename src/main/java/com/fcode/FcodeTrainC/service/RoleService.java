package com.fcode.FcodeTrainC.service;

import com.fcode.FcodeTrainC.entity.Role;

public interface RoleService {
    Role findById(int id);

    Role findByName(String name);
}
