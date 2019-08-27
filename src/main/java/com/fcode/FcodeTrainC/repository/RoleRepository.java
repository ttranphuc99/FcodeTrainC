package com.fcode.FcodeTrainC.repository;

import com.fcode.FcodeTrainC.entity.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Role findFirstByName(String name);
}
