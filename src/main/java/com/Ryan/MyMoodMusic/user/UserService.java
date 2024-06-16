package com.Ryan.MyMoodMusic.user;

import com.Ryan.MyMoodMusic.dto.LoginDto;
import com.Ryan.MyMoodMusic.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String addUser(UserDto userDTO) {
        System.out.println("Checking for existing username: " + userDTO.getUsername());
        Optional<User> existingUserOpt = userRepository.findByUsername(userDTO.getUsername());
        if (existingUserOpt.isPresent()) {
            System.out.println("Existing user found: ");
            return "Username already exists";
        }
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(user);
        return "User created";
    }

//    public ResponseEntity<?> login(LoginDto loginDTO) {
//        String username = loginDTO.getUsername();
//        String password = loginDTO.getPassword();
//        try {
//            boolean existed = userRepository.existsByUsernameAndPassword(username,password);
//            if(!existed) {
//                return ResponseEntity.ok("입력하신 로그인 정보가 존재하지 않습니다");
//            }
//        } catch (Exception e){
//            return ResponseEntity.ok("데이터베이스 연결에 실패했습니다");
//
//        }
//    }

}
