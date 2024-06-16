package com.Ryan.MyMoodMusic.config;

import com.Ryan.MyMoodMusic.user.CustomAuthenticationSuccessHandler;
import com.Ryan.MyMoodMusic.user.MyUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
    private final MyUserDetailsService myUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // CSRF 보호 비활성화
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/users/signup", "/api/users/login").permitAll() // 회원가입 및 로그인 엔드포인트는 누구나 접근 가능
                                .anyRequest().authenticated() // 그 외의 요청은 인증된 사용자만 접근 가능
                )
                .formLogin(formLogin ->
                        formLogin
//                                .loginPage("http://localhost:3000/login") // 사용자 정의 로그인 페이지 URL
                                .loginProcessingUrl("/api/users/login") // 로그인 처리 URL
                                .usernameParameter("username") // 로그인 시 사용할 사용자명 파라미터 이름
                                .passwordParameter("password") // 로그인 시 사용할 비밀번호 파라미터 이름
//                                .defaultSuccessUrl("http://localhost:3000/main", true) // 로그인 성공 시 리디렉션 URL
                                .successHandler(customAuthenticationSuccessHandler) // 로그인 성공 핸들러 설정
                                .failureUrl("/login?error=true")
                )
                .logout(logout ->
                        logout
                                .logoutUrl("/api/users/logout") // 로그아웃 URL
                                .logoutSuccessUrl("/api/users/login") // 로그아웃 성공 시 리디렉션 URL
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // 비밀번호 암호화를 위한 PasswordEncoder 빈 생성
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        // AuthenticationManager 빈 생성
        return authenticationConfiguration.getAuthenticationManager();
    }


}
