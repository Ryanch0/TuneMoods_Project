package com.Ryan.MyMoodMusic.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
     private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var result = userRepository.findByUsername(username);
        if (result.isEmpty()){
            throw new UsernameNotFoundException("wrong username");
        }
        var user = result.get();
        List<GrantedAuthority> authorities  = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("유저"));

        return new User(user.getUsername(), user.getPassword(),authorities);
    }

}
