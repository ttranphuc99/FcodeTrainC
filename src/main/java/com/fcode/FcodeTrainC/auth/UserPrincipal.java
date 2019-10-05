package com.fcode.FcodeTrainC.auth;

import com.fcode.FcodeTrainC.entity.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {
    private static final long serialVersionUID = 1L;
    private Account account;

    public UserPrincipal(Account account) {
        this.account = account;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(account.getRole().getName()));
    }

    public String getRole() {
        return account.getRole().getName();
    }

    public String getFullname() {
        return account.getFullname();
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public String getUsername() {
        return account.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return account.getStatus() == 1;
    }

    @Override
    public boolean isAccountNonLocked() {
        return account.getStatus() == 1;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return account.getStatus() == 1;
    }

    @Override
    public boolean isEnabled() {
        return account.getStatus() == 1;
    }
}
