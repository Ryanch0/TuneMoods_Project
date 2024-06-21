package com.Ryan.MyMoodMusic.user;

import com.Ryan.MyMoodMusic.dto.SignupDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    public User(SignupDto dto) {
        this.username = dto.getUsername();
        this.password = dto.getPassword();
    }
}
