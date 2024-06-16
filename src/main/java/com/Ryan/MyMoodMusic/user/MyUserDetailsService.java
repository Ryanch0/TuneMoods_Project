package com.Ryan.MyMoodMusic.user;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

//@Service
//@RequiredArgsConstructor
//public class MyUserDetailsService implements UserDetailsService {
//    private final UserRepository userRepository;
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        // 사용자명을 기반으로 사용자 정보를 조회
//        var result = userRepository.findByUsername(username);
//        if (result.isEmpty()) {
//            // 사용자명이 존재하지 않을 경우 예외 발생
//            throw new UsernameNotFoundException("wrong username");
//        }
//        var user = result.get();
//
//        // 사용자 권한 설정
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        authorities.add(new SimpleGrantedAuthority("유저"));
//
//        // UserBuilder를 사용하여 UserDetails 객체 생성
//        return org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
//                .password(user.getPassword())
//                .authorities(authorities)
//                .build();
//    }
//}
