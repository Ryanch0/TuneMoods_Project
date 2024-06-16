package com.Ryan.MyMoodMusic.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String addUser(UserDTO userDTO) {
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

}
