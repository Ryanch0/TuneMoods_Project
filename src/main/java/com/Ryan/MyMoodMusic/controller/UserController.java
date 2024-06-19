package com.Ryan.MyMoodMusic.controller;
import com.Ryan.MyMoodMusic.dto.ResponseDto;
import com.Ryan.MyMoodMusic.dto.SignupDto;
import com.Ryan.MyMoodMusic.JWT.JwtUtil;
import com.Ryan.MyMoodMusic.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    //    회원가입
    @PostMapping("/signup")
    public ResponseEntity<ResponseDto<?>> signup(@RequestBody SignupDto signupDto) {
        ResponseDto<?> response = userService.addUser(signupDto);
        HttpStatus status = response.getResult() ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(response, status);
    }

//    @PostMapping("/login")
//    public String login(@RequestBody Map<String, String> data,
//                        HttpServletResponse response) {
//        var authToken = new UsernamePasswordAuthenticationToken(
//                data.get("username"), data.get("password"));
//        var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
//        SecurityContextHolder.getContext().setAuthentication(auth);
//
//        var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());
//        System.out.println(jwt);
//
//        var cookie = new Cookie("jwt",jwt);
//        cookie.setMaxAge(3600);
//        cookie.setHttpOnly(true);
//        cookie.setPath("/");
//        response.addCookie(cookie);
//
//        return jwt;
//    }
@PostMapping("/login")
public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> data,
                                                 HttpServletResponse response) {
    try {
        var authToken = new UsernamePasswordAuthenticationToken(
                data.get("username"), data.get("password"));
        var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);

        var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());
        System.out.println(jwt);

        var cookie = new Cookie("jwt", jwt);
        cookie.setMaxAge(3600);
        cookie.setHttpOnly(false); //보안상 true로 하는게 맞다
        cookie.setPath("/");
        cookie.setSecure(true);
        response.addCookie(cookie);
//        response.setHeader("Set-Cookie", "jwt=" + jwt + "; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=3600");

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("token", jwt);

        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    } catch (Exception e) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Invalid username or password");
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
}

    @GetMapping("/myName")
    public String myName(Authentication auth){
        var user = auth.getPrincipal();
        System.out.println(user);
        return (String) user;
    }
}
