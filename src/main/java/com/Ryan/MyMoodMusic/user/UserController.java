package com.Ryan.MyMoodMusic.user;
import com.Ryan.MyMoodMusic.dto.ResponseDto;
import com.Ryan.MyMoodMusic.dto.SignupDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    //    회원가입
    @PostMapping("/signup")
    public ResponseDto<?> signup(@RequestBody SignupDto signupDto) {
        ResponseDto<?> result = userService.addUser(signupDto);
        return result;
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> data,
                        HttpServletResponse response) {
        var authToken = new UsernamePasswordAuthenticationToken(
                data.get("username"), data.get("password"));
        var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);

        var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());
        System.out.println(jwt);

        var cookie = new Cookie("jwt",jwt);
        cookie.setMaxAge(3600);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
        return jwt;
    }

    @GetMapping("/myName")
    public String myName(Authentication auth){
        var user = auth.getPrincipal();
        System.out.println(user);
        return (String) user;
    }
}
