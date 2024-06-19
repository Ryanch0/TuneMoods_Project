package com.Ryan.MyMoodMusic.service;

import com.Ryan.MyMoodMusic.dto.ResponseDto;
import com.Ryan.MyMoodMusic.dto.SignupDto;
import com.Ryan.MyMoodMusic.user.User;
import com.Ryan.MyMoodMusic.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ResponseDto<?> addUser(SignupDto dto) {
        String username = dto.getUsername();
        String password = dto.getPassword();

        //username 중복확인
        try{
            Optional<User> existingUser = userRepository.findByUsername(username);
            if(existingUser.isPresent()) {
                return ResponseDto.setFailed("중복된 id");
            }
        } catch (Exception e) {
            return ResponseDto.setFailed("DB연결에 실패");
        }
            User user = new User(dto);
            String hashedPassword = passwordEncoder.encode(password);
            user.setPassword(hashedPassword);
        try {
            userRepository.save(user);
        } catch (Exception e) {
            return ResponseDto.setFailed("DB연결에 실패");
        }
        return ResponseDto.setSuccess("회원가입 성공!");
    }

}
