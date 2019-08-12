package com.fcode.FcodeTrainC.auth;

import com.fcode.FcodeTrainC.entity.Account;
import com.fcode.FcodeTrainC.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findFirstByUsername(username);

        if (account == null) {
            throw new UsernameNotFoundException("Username or password is incorrect");
        }

        return new UserPrincipal(account);
    }
}
