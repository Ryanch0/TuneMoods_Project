package com.Ryan.MyMoodMusic.user;
import com.Ryan.MyMoodMusic.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    //    회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> addMember(@RequestBody UserDto userDTO) {
        String result = userService.addUser(userDTO);
        if ("Username already exists".equals(result)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> signIn(@RequestBody UserDto userDTO) {
        return null;
    }


    @GetMapping("/myName")
    public String name(){
        return "User";
    }

}





