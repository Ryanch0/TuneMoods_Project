package com.Ryan.MyMoodMusic.JWT;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Arrays;


public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        System.out.println("필터실행됨");
        Cookie[] cookies = request.getCookies();
//        쿠키가 없을 때(로그인 안했을때)
       if(cookies == null){
           filterChain.doFilter(request,response);
           return;
       }
        //쿠키가 있을 때
        var jwtCookie = "";
        for(int i = 0; i< cookies.length; i++){
            if(cookies[i].getName().equals("jwt")){
                jwtCookie = cookies[i].getValue();
            }
        }

        System.out.println(jwtCookie);
        Claims claim;
        try{
           claim = JwtUtil.extractToken(jwtCookie);
        } catch (Exception e){
            filterChain.doFilter(request,response);
            return;
        }


        String[] authoritiesArray = claim.get("authorities") != null ? claim.get("authorities").toString().split(",") : new String[0];
        var authorities = Arrays.stream(authoritiesArray)
                .map(SimpleGrantedAuthority::new)
                .toList();

        // 사용자 이름을 가져옴 (클레임에 "username"이 없는 경우 처리)
        String username = claim.get("username") != null ? claim.get("username").toString() : "anonymous";



        var authToken = new UsernamePasswordAuthenticationToken(
                username,null,authorities
        );
        authToken.setDetails(new WebAuthenticationDetailsSource()
                .buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
