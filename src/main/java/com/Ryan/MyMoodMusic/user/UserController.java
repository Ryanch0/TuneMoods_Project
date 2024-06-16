package com.Ryan.MyMoodMusic.user;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    //    회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> addMember(@RequestBody UserDTO userDTO) {
        String result = userService.addUser(userDTO);
        if ("Username already exists".equals(result)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword());
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            if (authentication.isAuthenticated()) {
                return ResponseEntity.ok("Login successful");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
        }
    }
//    @PostMapping("/login")
//    public ResponseEntity<?> login() {
//        // SecurityContextHolder를 통해 현재 인증된 사용자의 정보를 가져올 수 있습니다.
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication.isAuthenticated()) {
//            return ResponseEntity.ok("Login successful");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
//        }
//    }


    @GetMapping("/myName")
    public ResponseEntity<?> getMyName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok(authentication.getName());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in");
        }
    }

}


//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User user) {
//        // 사용자 인증 로직 (예: 데이터베이스 조회)
//        Optional<User> foundUser = userRepository.findByUsername(user.getUsername());
//        if (foundUser.isPresent() && passwordEncoder.matches(user.getPassword(), foundUser.get().getPassword())) {
//            // 인증 성공
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
//            return ResponseEntity.ok("Login successful");
//        } else {
//            // 인증 실패
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//        }
//    }
//
//    @GetMapping("/myName")
//    public String getUserInfo(Authentication auth) {
//         return auth.getName();
//
////    public ResponseEntity<?> getCurrentUser(Authentication auth) {
////        // 현재 인증된 사용자 정보를 가져옴
////        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
////            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in");
////        }
////        System.out.println(auth);
////        return ResponseEntity.ok(auth.getName());
////    }
//
//    }



