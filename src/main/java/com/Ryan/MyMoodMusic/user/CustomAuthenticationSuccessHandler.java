package com.Ryan.MyMoodMusic.user;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 로그인 성공 시 콘솔에 메시지 출력
        System.out.println("User " + authentication.getName() + " has logged in successfully.");

        // 로그인 성공 후 기본 URL로 리디렉션
        response.sendRedirect("http://localhost:3000/main");
    }
}