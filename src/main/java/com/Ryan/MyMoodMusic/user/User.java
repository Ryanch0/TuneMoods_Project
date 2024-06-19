package com.Ryan.MyMoodMusic.user;

import com.Ryan.MyMoodMusic.dto.SignupDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private String playlists;
    private String playlistsUrl;

    public User(SignupDto dto) {
        this.username = dto.getUsername();
        this.password = dto.getPassword();
    }
}
