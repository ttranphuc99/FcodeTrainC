package com.fcode.FcodeTrainC.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        super();
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl(SecurityConstants.AUTH_LOGIN_URL);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        UserPrincipal user = (UserPrincipal) authResult.getPrincipal();
        List<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        String signingKey = SecurityConstants.JWT_SECRECT;

        String token = Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(signingKey.getBytes()), SignatureAlgorithm.HS512)
                .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)
                .setIssuer(SecurityConstants.TOKEN_ISSUER)
                .setAudience(SecurityConstants.TOKEN_AUDIENCE)
                .setSubject(user.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + 864000000))
                .claim("rol", roles)
                .compact();



        String cookieTok = SecurityConstants.TOKEN_HEADER + "=" + SecurityConstants.TOKEN_PREFIX + token;
//        String cookieRole = "role" + "=" + user.getRole();
//        String cookieUsername = "username" + "=" + user.getUsername();
//        String cookieFullname = "fullname" + "=" + URLEncoder.encode(user.getFullname(), "UTF-8");;

        response.addHeader("Set-Cookie",
                cookieTok + "; HttpOnly; SameSite=None; Max-Age=864000");
//        response.addHeader("Set-Cookie",
//                cookieFullname + "; SameSite=None; Max-Age=864000");
//        response.addHeader("Set-Cookie",
//                cookieRole + "; SameSite=None; Max-Age=864000");
//        response.addHeader("Set-Cookie",
//                cookieUsername + "; SameSite=None; Max-Age=864000");

//        Cookie c = new Cookie(SecurityConstants.TOKEN_HEADER, SecurityConstants.TOKEN_PREFIX + token);
//        c.setMaxAge(864000);
//        c.setHttpOnly(true);
//
//        response.addCookie(c);

//        Cookie role = new Cookie("role", user.getRole());
//        role.setMaxAge(864000);
//        response.addCookie(role);

//        Cookie username = new Cookie("username", user.getUsername());
//        username.setMaxAge(864000);
//        response.addCookie(username);

//        Cookie fullname = new Cookie("fullname", URLEncoder.encode(user.getFullname(), "UTF-8"));
//        fullname.setMaxAge(864000);
//        response.addCookie(fullname);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
